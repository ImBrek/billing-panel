import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from 'reducers';
import apiExt from 'middleware/apiExt';
import {apiMiddleware} from 'redux-api-middleware';
import promiseMiddleware from 'redux-promise';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore() {
    const logger = createLogger();

    const finalCreateStore = compose(
        applyMiddleware(thunk,apiExt,apiMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const store = finalCreateStore(rootReducer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
