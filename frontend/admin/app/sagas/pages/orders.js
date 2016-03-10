import {takeEvery} from 'redux-saga'
import {call, put, take, race} from 'redux-saga/effects'
import {change} from 'redux-form';

import {getTree} from 'actions/pages/services'
import {PAGE_ACTIVATE} from 'actions/pages/index'
import {CATEGORY} from 'actions/category'
import {SERVICE} from 'actions/service'
import {ADDT_SERVICE} from 'actions/addtService'


export function* watchOrders () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'orders';
        });
        yield put(getTree());
        while (true) {
            const result = yield take([
                PAGE_ACTIVATE,
            ]);
            if (result.type == PAGE_ACTIVATE) {
                break;
            } else {
                yield put(getTree());
            }

        }
    }
}

export function* watchForm () {
    while (true) {
        yield take((action)=> {
            return action.type == 'redux-form/CHANGE' && action.field == 'serviceId' && action.form == 'wizard'
        })
        yield put(change('wizard','descendants[0]',20))
    }
}