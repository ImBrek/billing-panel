import {CALL_API as CALL_API2} from 'redux-api-middleware'
import { normalize } from 'normalizr';
import { get } from 'lodash/object';

import config from 'config'

export const API_CREATE = Symbol('API Create');
export const API_READ = Symbol('API Read');
export const API_UPDATE = Symbol('API Update');
export const API_DELETE = Symbol('API Delete');
export const CALL_API = CALL_API2;

const methods = {
    [API_READ]: 'GET',
    [API_UPDATE]: 'PATCH',
    [API_CREATE]: 'POST',
    [API_DELETE]: 'DELETE'
};

function decorateSuccessType(type, payload, meta) {
    let action = {};
    if (typeof type == 'string') {
        action.type = type;
    } else {
        action = type;
    }
    if (action.payload) {
        const handler = action.payload;
        action.payload = (action, state, res)=> {
            return payload(action, state, res).then(res=>handler(action, state, res))
        }
    } else {
        action.payload = payload;
    }

    action.meta = meta;

    return action
}


export default store => next => reduxAction => {
    if (reduxAction[CALL_API]) {
        const {action,endpoint,schema,types,queryParams,body} = reduxAction[CALL_API];

        //add query params
        let queryParamsStr = '';
        if (queryParams){
            queryParamsStr = '?' + Object.keys(queryParams).map(function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]);
                }).join('&');
            delete reduxAction[CALL_API].queryParams;
        }

        //prepare body
        if (body){
            reduxAction[CALL_API].body = JSON.stringify(body);
        }

        //action -> method
        //endpoint -> rootUrl + endpoint
        Object.assign(reduxAction[CALL_API], {
            method: methods[action],
            endpoint: config.apiRoot + endpoint + '/' + queryParamsStr
        })
        delete reduxAction[CALL_API].action;

        //normalize success responses with schema param
        if (schema) {
            types[1] = decorateSuccessType(
                types[1],
                (action, state, res)=> {
                    return res.json().then((data)=> {
                        return Object.assign({},
                            normalize(data, schema)
                        );
                    })
                },
                (action, state, res)=> {
                    return {
                        normalizr: true
                    }
                }
            );
            delete reduxAction[CALL_API].schema;
        }

        reduxAction[CALL_API].headers || (reduxAction[CALL_API].headers = {})

        //add authorization header
        const token = get(store.getState(), 'token.key');
        if (token) {
            reduxAction[CALL_API].headers['Authorization'] = `Token ${token}`
        }

        //add content headers
        reduxAction[CALL_API].headers['Accept'] = 'application/json';
        reduxAction[CALL_API].headers['Content-Type'] = 'application/json';
    }

    return next(reduxAction);
}