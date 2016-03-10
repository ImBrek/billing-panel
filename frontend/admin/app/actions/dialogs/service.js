import { createAction } from 'redux-actions';

import {DIALOG_TYPE} from './index';

export const UPDATE_SHOW = 'DIALOGS/SERVICE_UPDATE_SHOW';
export const DELETE_SHOW = 'DIALOGS/SERVICE_DELETE_SHOW';

export const serviceUpdateShow = createAction(UPDATE_SHOW,(id)=>{
    return {
        id,
        mode:'update',
        [DIALOG_TYPE]:'serviceUpdate'
    }
});

export const serviceCreateShow  = createAction(UPDATE_SHOW,(categoryId)=>{
    return {
        categoryId,
        mode:'create',
        [DIALOG_TYPE]:'serviceUpdate'
    }
});

export const serviceDeleteShow = createAction(DELETE_SHOW,(id)=>{
    return {
        id,
        [DIALOG_TYPE]:'serviceDelete'
    }
});
