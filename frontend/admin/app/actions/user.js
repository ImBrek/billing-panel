import { createAction } from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'middleware/schemas';
import {createCRUD} from './helpers';


export const USER = createCRUD('USER');

export const createUser = createAction(USER.CREATE.REQUEST, (data)=> {
    return {
        method: API_CREATE,
        endpoint: `users`,
        actions: USER.CREATE,
        schema: schemas.USER,
        body: data
    }
});

export const getUser = createAction(USER.READ.REQUEST, (id)=> {
    return {
        method: API_READ,
        endpoint: `users/${id}`,
        actions: USER.READ,
        schema: schemas.USER,
    }
});

export const updateUser = createAction(USER.UPDATE.REQUEST, (id, data)=> {
    return {
        method: API_UPDATE,
        endpoint: `users/${id}`,
        actions: USER.UPDATE,
        schema: schemas.USER,
        body: data
    }
});