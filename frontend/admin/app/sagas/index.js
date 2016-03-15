import { fork } from 'redux-saga/effects'

import * as categoryDialogs from './dialogs/category'
import * as serviceDialogs from './dialogs/service'
import * as addtServiceDialogs from './dialogs/addtService'
import watchEntities from './entities'
import * as pageServices from './pages/services'
import * as login from './login'
import * as pageOrders from './pages/orders'

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
        fork(login.tokenControl),
        fork(login.form),
        fork(pageOrders.mainWatch),
    ];
}
