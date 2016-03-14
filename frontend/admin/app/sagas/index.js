import { fork } from 'redux-saga/effects'

import * as categoryDialogs from './dialogs/category'
import * as serviceDialogs from './dialogs/service'
import * as addtServiceDialogs from './dialogs/addtService'
import watchEntities from './entities'
import * as pageServices from './pages/services'
import * as pageOrders from './pages/orders'
import * as signIn from './signIn'
import * as init from './init'

export default function* root () {
    yield [
        fork(categoryDialogs.watchUpdate),
        fork(categoryDialogs.watchDelete),
        fork(serviceDialogs.watchUpdate),
        fork(serviceDialogs.watchDelete),
        fork(addtServiceDialogs.watchUpdate),
        fork(addtServiceDialogs.watchDelete),
        fork(watchEntities),
        fork(pageServices.watchServices),
        fork(pageOrders.watchOrders),
        fork(pageOrders.watchForm),
        fork(signIn.tokenControl),
        fork(signIn.form)
    ];
}
