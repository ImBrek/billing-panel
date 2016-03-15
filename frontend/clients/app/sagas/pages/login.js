import {put, take, cancel,fork} from 'redux-saga/effects'
import {change, isCancelError, startSubmit, stopSubmit} from 'redux-form';
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'

import {TOKEN} from 'actions/token';
import {getUser} from 'actions/user';
import {PAGE_ACTIVATE} from 'actions/pages/index'

export function* watchCreateToken () {
    try{
        while (true) {
            yield take(TOKEN.CREATE.SUCCESS);
            yield put(push('/panel/dashboard'));
        }
    } catch (error){

    }
}

export function* main () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'login';
        });
        const task = yield fork(watchCreateToken);
        yield take(PAGE_ACTIVATE);
        yield cancel(task);
    }
}