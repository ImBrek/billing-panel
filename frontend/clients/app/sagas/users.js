import {call, put, take, race,fork} from 'redux-saga/effects'

import {getUser} from 'actions/user';

export function* initCurrentUser(getState){
    const {token} = getState();
    if (token){
        yield put(getUser(token.userId));
    }
}