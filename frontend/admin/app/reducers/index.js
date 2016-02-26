import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import pages from './pages';
import token from './token';
import dialog from './dialog';

const rootReducer = combineReducers({
    routing,
    entities,
    pages,
    token,
    dialog
});

export default rootReducer;
