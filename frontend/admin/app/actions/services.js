import { createAction } from 'redux-actions';

import { CALL_API,API_CREATE,API_READ,API_UPDATE } from 'middleware/apiExt';

import schemas from 'middleware/schemas';

export const SERVICE_REQUEST = 'SERVICE_REQUEST';
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS';
export const SERVICE_FAILURE = 'SERVICE_FAILURE';


export const createService = function(data){
    return {
        [CALL_API]: {
            action: API_CREATE,
            endpoint: 'services-types/services',
            body: data,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            schema: schemas.ST_SERVICE
        }
    }
};

export const updateService = function(data){
    return {
        [CALL_API]: {
            action: API_UPDATE,
            endpoint: `services-types/services/${id}`,
            body: data,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            schema: schemas.ST_SERVICE
        }
    }
};