import {takeEvery} from 'redux-saga'
import {call, put, take, race, fork,cancel} from 'redux-saga/effects'
import {change,isCancelError,startSubmit,stopSubmit} from 'redux-form';

import {getTree} from 'actions/pages/services'
import {PAGE_ACTIVATE} from 'actions/pages/index'
import {USER} from 'actions/user';
import {TOKEN} from 'actions/token';
import {ORDER} from 'actions/order';
import {createToken} from 'actions/token';
import {prevPage,nextPage,setPage} from 'actions/pages/orders';

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
            return action.type == PAGE_ACTIVATE && action.payload.name == 'ordersPublic';
        });
        yield put(getTree());
        const task1 = yield fork(waitCreateUserAndLogin);
        const task2 = yield fork(waitSuccessLogin);
        const task3 = yield fork(waitCreateOrder);
        yield take(PAGE_ACTIVATE);
        yield cancel(task1);
        yield cancel(task2);
        yield cancel(task3);
    }
}