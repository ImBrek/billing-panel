import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from 'reducers';
import api from 'middleware/api';
import promiseMiddleware from 'redux-promise';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore() {
    const logger = createLogger();

    const finalCreateStore = compose(
        applyMiddleware(thunk, api, logger),
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
