import {takeEvery} from 'redux-saga'
import {call, put, take, race} from 'redux-saga/effects'

import {getTree} from 'actions/pages/services'
import {PAGE_ACTIVATE} from 'actions/pages/index'
import {CATEGORY} from 'actions/category'
import {SERVICE} from 'actions/service'
import {ADDT_SERVICE} from 'actions/addtService'


export function* watchServices () {
    while (true) {
        yield take((action)=>{
            return action.type == PAGE_ACTIVATE && action.payload.name == 'services';
        });
        while (true) {
            const result = yield take([
                PAGE_ACTIVATE,
                CATEGORY.CREATE.SUCCESS,
                CATEGORY.DELETE.SUCCESS,
                SERVICE.CREATE.SUCCESS,
                SERVICE.DELETE.SUCCESS,
                ADDT_SERVICE.CREATE.SUCCESS,
                ADDT_SERVICE.DELETE.SUCCESS,
                ]);
            if (result.type == PAGE_ACTIVATE) {
                break;
            } else {
                yield put(getTree());
            }

        }


    }
}