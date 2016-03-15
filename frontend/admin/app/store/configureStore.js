import {createStore, applyMiddleware, compose} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'reducers';
import rootSaga from 'sagas';

export default function configureStore () {
    const logger = createLogger();

    const routerM = routerMiddleware(browserHistory)

    const finalCreateStore = compose(
        applyMiddleware(createSagaMiddleware(rootSaga), routerM, logger),
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
