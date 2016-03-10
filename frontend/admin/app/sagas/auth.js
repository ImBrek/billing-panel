import {call, put, take, race} from 'redux-saga/effects'
import { browserHistory } from 'react-router';

import {TOKEN} from 'actions/token';


export function* watchAuth () {
    while (true) {
        const action = yield take([TOKEN.CREATE.SUCCESS, TOKEN.DELETE.SUCCESS])
        //
        if (action.type == TOKEN.CREATE.SUCCESS){
            localStorage.setItem('billing.token', JSON.stringify(action.payload.response.entities.tokens[action.payload.response.result]));
        } else {
            localStorage.removeItem('billing.token');
        }

    }
}