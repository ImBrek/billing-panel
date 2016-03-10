import {createAction} from 'redux-actions';

export const ENTITY_SELECT = 'ENTITY_SELECT'

export const selectEntity = createAction(ENTITY_SELECT, (entity, type)=> {
    return {
        ...entity,
        _type: type
    }
})