import { combineReducers } from 'redux';
import login from './login';
import services from './services';

export default function (state = {}, action) {
    return [login, services].reduce((state,reducer)=> {
        return reducer(state,action)
    }, state)
}