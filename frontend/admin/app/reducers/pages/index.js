import { combineReducers } from 'redux';

import login from './login';
import services from './services';

export default combineReducers({
    login,
    services,
});