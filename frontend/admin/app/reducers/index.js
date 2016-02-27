import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import page from './page';
import token from './token';
import dialog from './dialog';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    routing,
    entities,
    page,
    token,
    dialog,
    form: formReducer
});

export default rootReducer;
