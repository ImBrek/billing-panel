import {createAction} from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'middleware/schemas';
import {browserHistory} from 'react-router';

import {createCRUD} from './helpers';

export const CATEGORY = createCRUD('CATEGORY')


export const readCategory = createAction(CATEGORY.READ.REQUEST, ()=> {
    return {
        method: API_READ,
        endpoint: `services-types/categories/${id}`,
        actions: CATEGORY.READ,
        schema: schemas.ST_CATEGORY
    }
});

export const createCategory = createAction(CATEGORY.CREATE.REQUEST, (data)=> {
    return {
        method: API_CREATE,
        endpoint: `services-types/categories`,
        actions: CATEGORY.CREATE,
        schema: schemas.ST_CATEGORY,
        body: data
    }
});

export const updateCategory = createAction(CATEGORY.UPDATE.REQUEST, (id, data)=> {
    return {
        method: API_UPDATE,
        endpoint: `services-types/categories/${id}`,
        actions: CATEGORY.UPDATE,
        schema: schemas.ST_CATEGORY,
        body: data
    }
});

export const deleteCategory = createAction(CATEGORY.DELETE.REQUEST, (id)=> {
    return {
        method: API_DELETE,
        endpoint: `services-types/categories/${id}`,
        actions: CATEGORY.DELETE,
        schema: schemas.ST_CATEGORY,
    }
});