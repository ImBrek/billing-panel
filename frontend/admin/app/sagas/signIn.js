import {put, take, cancel} from 'redux-saga/effects'
import {change, isCancelError, startSubmit, stopSubmit} from 'redux-form';

import {TOKEN} from 'actions/token';
import {getUser} from 'actions/user';

export function* form () {
    while (true) {
        yield take(TOKEN.CREATE.REQUEST);
        yield put(startSubmit('signIn'));
        const action = yield take([TOKEN.CREATE.SUCCESS, TOKEN.CREATE.FAILURE]);
        if (action.type == TOKEN.CREATE.FAILURE) {
            yield put(stopSubmit('signIn', {_error: 'Sign in failed'}));
        } else {
            yield put(getUser(action.payload.response.result));
            yield put(stopSubmit('signIn'));
        }
    }
}

export function* tokenControl () {
    while (true) {
        const action = yield take([TOKEN.CREATE.SUCCESS, TOKEN.DELETE.SUCCESS])
        //
        if (action.type == TOKEN.CREATE.SUCCESS) {
            localStorage.setItem('billing.token', JSON.stringify(action.payload.response.entities.tokens[action.payload.response.result]));
        } else {
            localStorage.removeItem('billing.token');
        }

    }
}