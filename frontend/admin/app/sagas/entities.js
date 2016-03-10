import fetch, {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';
import {call, put, take, race} from 'redux-saga/effects'
import {createAction} from 'redux-actions';


export default function* watchEntities () {
    while (true) {
        const {payload} = yield take((action)=> {
            return action.payload && [API_READ, API_UPDATE, API_CREATE, API_DELETE].indexOf(action.payload.method) != -1;
        });
        const actions = payload.actions;
        delete payload.actions;
        const {response, error} = yield call(fetch, payload);

        if (response)
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
                error:true
            });
        }
    }
}