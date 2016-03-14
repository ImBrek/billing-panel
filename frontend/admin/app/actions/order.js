import { createAction } from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'middleware/schemas';
import {createCRUD} from './helpers';


export const ORDER = createCRUD('ORDER');

export const createOrder = createAction(ORDER.CREATE.REQUEST, (data)=> {
    return {
        method: API_CREATE,
        endpoint: `orders/orders`,
        actions: ORDER.CREATE,
        schema: schemas.ORDER,
        body: data
    }
});

export const getOrder = createAction(ORDER.READ.REQUEST, (id)=> {
    if (id){
        return {
            method: API_READ,
            endpoint: `orders/orders/${id}`,
            actions: ORDER.READ,
            schema: schemas.ORDER,
        }
    } else {
        return {
            method: API_READ,
            endpoint: `orders/orders`,
            actions: ORDER.READ,
            schema: schemas.ORDER_ARRAY,
        }
    }
});

export const updateOrder = createAction(ORDER.UPDATE.REQUEST, (id, data)=> {
    return {
        method: API_UPDATE,
        endpoint: `orders/orders/${id}`,
        actions: ORDER.UPDATE,
        schema: schemas.ORDER,
        body: data
    }
});