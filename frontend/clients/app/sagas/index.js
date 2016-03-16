import { fork } from 'redux-saga/effects'

import watchEntities from './entities'
import * as pageOrdersPublic from './pages/ordersPublic'
import * as pageLogin from './pages/login'
import * as pageOrders from './pages/orders'
import * as login from './login'
import * as users from './users'

export default function* root (getState) {
    yield [
        fork(watchEntities,getState),
        fork(pageOrdersPublic.mainWatch),
        fork(pageOrders.mainWatch),
        fork(pageLogin.main),
        fork(login.tokenControl),
        fork(login.form),
        fork(users.initCurrentUser, getState)
    ];
}
