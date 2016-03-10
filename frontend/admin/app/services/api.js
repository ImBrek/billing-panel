import fetch from 'isomorphic-fetch';
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys,decamelizeKeys } from 'humps'

import config from 'config'

export const API_CREATE = Symbol('API Create');
export const API_READ = Symbol('API Read');
export const API_UPDATE = Symbol('API Update');
export const API_DELETE = Symbol('API Delete');
export const CALL_API = Symbol('CALL API');

const methods = {
    [API_READ]: 'GET',
    [API_UPDATE]: 'PUT',
    [API_CREATE]: 'POST',
    [API_DELETE]: 'DELETE'
};

export default function (options) {
    let {endpoint, method, body, queryParams = '', credentials, headers = {}, schema} = options;

    //api action -> method
    method = methods[method];

    if (queryParams) {
        queryParams = '?' + Object.keys(queryParams).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]);
            }).join('&');
    }

    //endpoint -> rootUrl + endpoint
    endpoint = config.apiRoot + endpoint + queryParams

    //prepare body
    if (body) {
        body = JSON.stringify(decamelizeKeys(body));
    }

    //add content headers
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';


    //add authorization header
    const token = 'TOKEN';
    if (token) {
        headers['Authorization'] = `Token ${token}`
    }
    return fetch(endpoint, {method, body, credentials, headers})
        .then(response => {
                if (response.status == 204) {
                    return {json:{},response};
                }
                return response.json().then(json => ({json, response}))
            }
        )
        .then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            const camelizedJson = camelizeKeys(json);

            return Object.assign({},
                normalize(camelizedJson, schema),
            )
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}
