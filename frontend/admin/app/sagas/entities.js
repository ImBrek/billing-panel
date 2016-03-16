import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';
import {call, put, take, race,fork} from 'redux-saga/effects'
import {createAction} from 'redux-actions';
import schemas from 'services/schemas';

import {tokenRequired,createToken,TOKEN} from 'actions/token';

function* sendRequest (payload,getState) {
    var result = yield call(fetch, payload);

    if (result.response.status == 401) {
        const {token:{refreshToken}} = getState();
        if (refreshToken) {
            const {response,error} =  yield call(fetch,{
                method: API_CREATE,
                endpoint: `tokens`,
                schema: schemas.TOKEN,
                body: {
                    refreshToken
                }
            });
            if (!error){
                yield put({
                    type: TOKEN.CREATE.SUCCESS,
                    payload: {
                        request: payload,
                        response
                    }
                });
                const {token:{accessToken}} = getState();
                payload.headers || (payload.headers = {});
                payload.headers['Authorization'] = `Bearer ${accessToken}`;
                return yield call(fetch, payload);
            }
        }
        yield put(tokenRequired());
    }

    return result;
}

function* processRequest (payload,getState) {
    const actions = payload.actions;
    delete payload.actions;

    const {response, error} = yield sendRequest(payload,getState);

    if (!error)
        yield put({
            type: actions.SUCCESS,
            payload: {
                request: payload,
                response
            }
        });
    else {
        yield put({
            type: actions.FAILURE,
            payload: {
                request: payload,
                error
            },
            error: true
        });
    }
}

export default function* watchEntities (getState) {
    while (true) {
        const {payload} = yield take((action)=> {
            return action.payload && [API_READ, API_UPDATE, API_CREATE, API_DELETE].indexOf(action.payload.method) != -1;
        });
        yield fork(processRequest, payload,getState)

    }
}