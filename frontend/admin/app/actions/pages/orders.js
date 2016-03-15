import {createAction} from 'redux-actions';
import {createCRUD} from 'actions/helpers';
import {API_READ} from 'services/api';
import schemas from 'services/schemas';

export const NEXT = 'PAGES/ORDERS/NEXT_PAGE';
export const PREV = 'PAGES/ORDERS/PREV_PAGE';
export const SET = 'PAGES/ORDERS/SET_PAGE';

export const setPage = createAction(SET, (num)=> {
    return num
})

export const nextPage = createAction(NEXT);

export const prevPage = createAction(PREV);

export const ORDER = createCRUD('PAGES/ORDERS/ORDER');

export const getTree = createAction(ORDER.READ.REQUEST, ()=> {
    return {
        method: API_READ,
        endpoint: 'orders/orders',
        queryParams: {
            expand: 'orderedServices,orderedServices.option,orderedServices.service,client'
        },
        actions: ORDER.READ,
        schema: schemas.ORDER_ARRAY
    }
});
