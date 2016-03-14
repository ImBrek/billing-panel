import {takeEvery} from 'redux-saga'
import {call, put, take, race, fork,cancel} from 'redux-saga/effects'
import {change,isCancelError,startSubmit,stopSubmit} from 'redux-form';

import {getTree} from 'actions/pages/services'
import {PAGE_ACTIVATE} from 'actions/pages/index'
import {USER} from 'actions/user';
import {TOKEN} from 'actions/token';
import {createToken} from 'actions/token';
import {ORDER} from 'actions/order';
import {prevPage,nextPage,setPage} from 'actions/pages/orders';

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

function* waitCreateUserAndLogin () {
    try{
        while (true) {
            const {payload:{body:{username, password}}} = yield take(USER.CREATE.REQUEST);
            yield put(startSubmit('register'));
            const {type} = yield take([USER.CREATE.SUCCESS, USER.CREATE.FAILURE]);
            if (type == USER.CREATE.SUCCESS) {
                yield put(createToken(username, password))
            }
            yield take([TOKEN.CREATE.SUCCESS, TOKEN.CREATE.FAILURE])
            yield put(stopSubmit('register'));
        }
    } catch (error){
    }
}

function* waitCreateOrder () {
    try{
        while (true) {
            yield take(ORDER.CREATE.REQUEST);
            yield put(startSubmit('orderService'));
            const {type} = yield take([ORDER.CREATE.SUCCESS, ORDER.CREATE.FAILURE]);
            yield put(stopSubmit('orderService'));
        }
    } catch (error){
    }
}

function* waitSuccessLogin(){
    try{
        while (true) {
            yield take(TOKEN.CREATE.SUCCESS);
            yield put(nextPage());
        }
    } catch (error){
    }
}

export function* mainWatch () {
    while (true) {
        yield take((action)=> {
            return action.type == PAGE_ACTIVATE && action.payload.name == 'orders';
        });
        const task = yield fork(waitCreateUserAndLogin);
        yield fork(waitSuccessLogin);
        yield fork(waitCreateOrder);
        yield take(PAGE_ACTIVATE);
        yield cancel(task);
    }
}