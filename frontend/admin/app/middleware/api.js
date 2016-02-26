import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { get } from 'lodash/object';

const API_ROOT = 'http://192.168.0.112:8000/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(action = API_READ, endpoint, params = {}, schema, token) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    let body;
    let searchParams = '';

    if (action == API_READ) {
        searchParams = Object.keys(params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }).join('&');
        searchParams = '?' + searchParams;
    } else {
        body = JSON.stringify(params);
    }

    const methods = {
        [API_READ]: 'GET',
        [API_UPDATE]: 'PUT',
        [API_CREATE]: 'POST',
        [API_DELETE]: 'DELETE'
    };

    return fetch(fullUrl + '/' + searchParams, {
        method: methods[action],
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body
    })
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            const camelizedJson = camelizeKeys(json);

            return Object.assign({},
                normalize(camelizedJson, schema)
            );
        });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

export const API_CREATE = Symbol('API Create');
export const API_READ = Symbol('API Read');
export const API_UPDATE = Symbol('API Update');
export const API_DELETE = Symbol('API Delete');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => reduxAction => {
    if (!reduxAction.payload) {
        return next(reduxAction);
    }

    const callAPI = reduxAction.payload[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(reduxAction);
    }

    let {endpoint, types, action, params} = callAPI;
    const {schema} = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if ([API_CREATE, API_READ, API_UPDATE, API_DELETE].indexOf(action) == -1) {
        throw new Error('Expected one of action types');
    }

    if (!schema) {
        throw new Error('Specify one of the exported Schemas.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    types = types.map(type => {
        if (typeof type === 'string') {
            return createAction(type);
        }
        return type;
    });

    function preparePayload(payload) {
        const newPayload = Object.assign({}, reduxAction.payload, payload);
        delete newPayload[CALL_API];
        return newPayload;
    }

    const [ requestType, successType, failureType ] = types;

    next(requestType(preparePayload()));

    const token = get(store.getState(), 'token.key');

    return callApi(action, endpoint, params, schema, token)
        .then(
            response => {
                setTimeout(function () {
                    next(successType(preparePayload({
                        response
                    })))
                },1000)
            },
            error => next(failureType(error))
        );
};
