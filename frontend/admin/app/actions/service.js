import { createAction } from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'middleware/schemas';
import {createCRUD} from './helpers';


export const SERVICE = createCRUD('SERVICE')

export const createService = createAction(SERVICE.CREATE.REQUEST, (categoryId,data)=> {
    return {
        method: API_CREATE,
        endpoint: `services-types/services`,
        actions: SERVICE.CREATE,
        schema: schemas.ST_SERVICE,
        body: {
            ...data,
            categoryId
        }
    }
});

export const updateService = createAction(SERVICE.UPDATE.REQUEST, (id, data)=> {
    return {
        method: API_UPDATE,
        endpoint: `services-types/services/${id}`,
        actions: SERVICE.UPDATE,
        schema: schemas.ST_SERVICE,
        body: data
    }
});

export const deleteService = createAction(SERVICE.DELETE.REQUEST, (id)=> {
    return {
        method: API_DELETE,
        endpoint: `services-types/services/${id}`,
        actions: SERVICE.DELETE,
        schema: schemas.ST_SERVICE,
    }
});