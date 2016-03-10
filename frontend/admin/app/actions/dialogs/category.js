import { createAction } from 'redux-actions';

import {DIALOG_TYPE} from './index';

export const UPDATE_SHOW = 'DIALOGS/CATEGORY_UPDATE_SHOW';
export const DELETE_SHOW = 'DIALOGS/CATEGORY_DELETE_SHOW';

export const categoryCreateShow = createAction(UPDATE_SHOW,()=>{
    return {
        mode:'create',
        [DIALOG_TYPE]:'categoryUpdate'
    }
});

export const categoryUpdateShow = createAction(UPDATE_SHOW,(id)=>{
    return {
        id,
        mode:'update',
        [DIALOG_TYPE]:'categoryUpdate'
    }
});

export const categoryDeleteShow = createAction(DELETE_SHOW,(id)=>{
    return {
        id,
        [DIALOG_TYPE]:'categoryDelete'
    }
});
