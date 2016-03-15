import { createAction } from 'redux-actions';

import { CALL_API,API_CREATE,API_READ,API_UPDATE } from 'middleware/apiExt';
import schemas from 'services/schemas';

export const OPTION_REQUEST = 'OPTION_REQUEST';
export const OPTION_SUCCESS = 'OPTION_SUCCESS';
export const OPTION_FAILURE = 'OPTION_FAILURE';


export const createOption = createAction(OPTION_REQUEST, (data) => {
    return {
        [CALL_API]: {
            action: API_CREATE,
            endpoint: 'services-types/options',
            body: data,
            types: [OPTION_REQUEST, OPTION_SUCCESS, OPTION_FAILURE],
            schema: schemas.ST_OPTION
        }
    };
});

export const updateOption = createAction(OPTION_REQUEST, (id,data) => {
    return {
        [CALL_API]: {
            action: API_UPDATE,
            endpoint: `services-types/options/${id}`,
            body: data,
            types: [OPTION_REQUEST, OPTION_SUCCESS, OPTION_FAILURE],
            schema: schemas.ST_OPTION
        }
    };
});