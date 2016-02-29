import { combineReducers } from 'redux';
import login from './login';
import services from './services';
import {PAGE_ACTIVATE} from 'actions/pages';

const activeReducers = {
    login,
    services
};

export default function (state, action) {
    if (state === undefined) {
        const newState = {
            activePage: 'services'
        }
        for (const name in activeReducers) {
            newState[name] = activeReducers[name](undefined, action);
        }
        return newState;
    }
    if (state.activePage) {
        const newState = {
            activePage: state.activePage
        }
        for (const name in activeReducers) {
            newState[name] = (name == state.activePage) ? activeReducers[name](state[name], action) : state[name]
        }
        return newState

    }

    return state
}

