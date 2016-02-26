import { createAction } from 'redux-actions';

import { CALL_API,API_CREATE,API_READ } from 'middleware/api';
import schemas from 'middleware/schemas';

export const SERVICE_REQUEST = 'SERVICE_REQUEST';
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS';
export const SERVICE_FAILURE = 'SERVICE_FAILURE';


export const createService = createAction(SERVICE_REQUEST, (data) => {
    return {
        [CALL_API]: {
            action: API_CREATE,
            endpoint: 'services-types/services',
            params: data,
            types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
            schema: schemas.ST_SERVICE
        }
    };
});