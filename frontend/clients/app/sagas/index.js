import { fork } from 'redux-saga/effects'

import watchEntities from './entities'
import * as pageOrdersPublic from './pages/ordersPublic'
import * as pageLogin from './pages/login'
import * as pageOrders from './pages/orders'
import * as login from './login'

export default function* root () {
    yield [
        fork(watchEntities),
        // fork(pageOrdersPublic.watchOrders),
        fork(pageOrdersPublic.mainWatch),
        fork(pageOrders.mainWatch),
        fork(pageLogin.main),
        fork(login.tokenControl),
        fork(login.form),
    ];
}
