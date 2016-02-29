import { createAction } from 'redux-actions';

export const ENTITY_SELECT = 'ENTITY_SELECT'

export const selectEntity = createAction(ENTITY_SELECT, (id, type)=> {
    return {
        id,
        type
    }
})