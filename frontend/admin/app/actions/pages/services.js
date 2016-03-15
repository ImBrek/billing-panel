import {createAction} from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'services/schemas';

export const TREE_REQUEST = 'PAGES/TREE_REQUEST';
export const TREE_SUCCESS = 'PAGES/TREE_SUCCESS';
export const TREE_FAILURE = 'PAGES/TREE_FAILURE';

export const getTree = createAction(TREE_REQUEST, ()=> {
    return {
        method: API_READ,
        endpoint: 'services-types/categories',
        queryParams: {
            expand: 'services,services.descendants,services.descendants.options'
        },
        actions: {
            SUCCESS: TREE_SUCCESS,
            FAILURE: TREE_FAILURE
        },
        schema: schemas.ST_CATEGORY_ARRAY
    }
});
