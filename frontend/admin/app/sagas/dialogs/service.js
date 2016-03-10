import {call, put, take, race} from 'redux-saga/effects'

import {SERVICE} from 'actions/service';
import {DIALOG_HIDE} from 'actions/dialogs/index';
import {UPDATE_SHOW,DELETE_SHOW} from 'actions/dialogs/service';

export function* watchUpdate () {
    while (true) {
        const {payload:{id}} = yield take(UPDATE_SHOW);
        const result = yield race({
            success: take([SERVICE.CREATE.SUCCESS, SERVICE.UPDATE.SUCCESS]),
            cancel: take(DIALOG_HIDE)
        });
        if (result.success) {
            yield put({type: DIALOG_HIDE});

        }
    }
}

export function* watchDelete () {
    while (true) {
        const {payload:{id}} = yield take(DELETE_SHOW);
        const result = yield race({
            success: take(SERVICE.DELETE.SUCCESS),
            cancel: take(DIALOG_HIDE)
        });
        if (result.success) {
            yield put({type: DIALOG_HIDE});

        }
    }
}
