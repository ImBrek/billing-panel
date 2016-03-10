import { createAction } from 'redux-actions';

import {DIALOG_TYPE} from './index';

export const UPDATE_SHOW = 'DIALOGS/ADDT_SERVICE_UPDATE_SHOW';
export const DELETE_SHOW = 'DIALOGS/ADDT_SERVICE_DELETE_SHOW';

export const addtServiceUpdateShow = createAction(UPDATE_SHOW,(id)=>{
    return {
        id,
        mode:'update',
        [DIALOG_TYPE]:'addtServiceUpdate'
    }
});

export const addtServiceCreateShow  = createAction(UPDATE_SHOW,(parentId)=>{
    return {
        parentId,
        mode:'create',
        [DIALOG_TYPE]:'addtServiceUpdate'
    }
});

export const addtServiceDeleteShow = createAction(DELETE_SHOW,(id)=>{
    return {
        id,
        [DIALOG_TYPE]:'addtServiceDelete'
    }
});
