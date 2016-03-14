import {createAction} from 'redux-actions';

export const NEXT = 'PAGES/ORDERS/NEXT_PAGE';
export const PREV = 'PAGES/ORDERS/PREV_PAGE';
export const SET = 'PAGES/ORDERS/SET_PAGE';

export const setPage = createAction(SET,(num)=>{
    return num
})

export const nextPage = createAction(NEXT);

export const prevPage = createAction(PREV);