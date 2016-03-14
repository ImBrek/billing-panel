import {takeEvery} from 'redux-saga'
import {call, put, take, race, fork,cancel} from 'redux-saga/effects'
import {change,isCancelError,startSubmit,stopSubmit} from 'redux-form';

import {getTree} from 'actions/pages/orders';
import {PAGE_ACTIVATE} from 'actions/pages/index';

// function* waitSuccessLogin(){
//     try{
//         while (true) {
//             yield take(TOKEN.CREATE.SUCCESS);
//             yield put(nextPage());
//         }
//     } catch (error){
//     }
// }

export function* mainWatch () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'dashboard';
        });
        yield put(getTree());
        yield take(PAGE_ACTIVATE);
    }
}