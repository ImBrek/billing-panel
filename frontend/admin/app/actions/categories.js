import { createAction } from 'redux-actions';

import { CALL_API,API_CREATE,API_READ } from 'middleware/apiExt';
import schemas from 'middleware/schemas';
import { browserHistory } from 'react-router';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAILURE = 'CATEGORY_FAILURE';


export const getCategories = function (expand) {
    return {
        [CALL_API]: {
            action: API_READ,
            endpoint: 'services-types/categories',
            queryParams: {
                expand
            },
            types: [CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAILURE],
            schema: schemas.ST_CATEGORY_ARRAY
        }
    }
}


export const getServicesTree = function () {
    return getCategories('services,services.options,services.options.values')
}

