import {call, put, take, race,fork} from 'redux-saga/effects'

import {getUser} from 'actions/user';

export function* initCurrentUser(getState){
    const {token:{userId}} = getState();
    yield put(getUser(userId));
}