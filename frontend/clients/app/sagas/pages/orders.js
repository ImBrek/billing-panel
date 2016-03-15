import {takeEvery} from 'redux-saga'
import {call, put, take, race, fork,cancel} from 'redux-saga/effects'
import {change,isCancelError,startSubmit,stopSubmit} from 'redux-form';

import {getTree} from 'actions/pages/orders';
import {PAGE_ACTIVATE} from 'actions/pages/index';

export function* mainWatch () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'orders';
        });
        yield put(getTree());
        yield take(PAGE_ACTIVATE);
    }
}