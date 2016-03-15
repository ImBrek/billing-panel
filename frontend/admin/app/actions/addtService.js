import { createAction } from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'services/schemas';
import {createCRUD} from './helpers';


export const ADDT_SERVICE = createCRUD('ADDT_SERVICE')

export const createAddtService = createAction(ADDT_SERVICE.CREATE.REQUEST, (parentId,data)=> {
    return {
        method: API_CREATE,
        endpoint: `services-types/services`,
        actions: ADDT_SERVICE.CREATE,
        schema: schemas.ST_SERVICE,
        body: {
            ...data,
            parentId
        }
    }
});

export const updateAddtService = createAction(ADDT_SERVICE.UPDATE.REQUEST, (id, data)=> {
    return {
        method: API_UPDATE,
        endpoint: `services-types/services/${id}`,
        actions: ADDT_SERVICE.UPDATE,
        schema: schemas.ST_SERVICE,
        body: data
    }
});

export const deleteAddtService = createAction(ADDT_SERVICE.DELETE.REQUEST, (id)=> {
    return {
        method: API_DELETE,
        endpoint: `services-types/services/${id}`,
        actions: ADDT_SERVICE.DELETE,
        schema: schemas.ST_SERVICE,
    }
});