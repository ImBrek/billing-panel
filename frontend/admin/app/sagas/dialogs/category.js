import {call, put, take, race} from 'redux-saga/effects'

import {CATEGORY} from 'actions/category';
import {DIALOG_HIDE} from 'actions/dialogs/index';
import {UPDATE_SHOW,DELETE_SHOW} from 'actions/dialogs/category';

export function* watchUpdate () {
    while (true) {
        const {payload:{id}} = yield take(UPDATE_SHOW);
        const result = yield race({
            success: take([CATEGORY.CREATE.SUCCESS, CATEGORY.UPDATE.SUCCESS]),
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
            success: take(CATEGORY.DELETE.SUCCESS),
            cancel: take(DIALOG_HIDE)
        });
        if (result.success) {
            yield put({type: DIALOG_HIDE});

        }
    }
}
