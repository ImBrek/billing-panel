import { createAction } from 'redux-actions';

export const DIALOG_HIDE = 'DIALOGS/HIDE';

export const hideDialog = createAction(DIALOG_HIDE);


export const OPTION_UPDATE_SHOW = 'DIALOGS/OPTION_UPDATE_SHOW';

export const optionUpdateShow = createAction(OPTION_UPDATE_SHOW,(id)=>{
    return {
        id,
        mode:'update'
    }
});

export const optionCreateShow = createAction(OPTION_UPDATE_SHOW,(serviceId)=>{
    return {
        serviceId,
        model:'create'
    }
});

export const DIALOG_SHOW = 'DIALOG_SHOW';

export const categoryUpdateShow = createAction(DIALOG_SHOW,(id)=>{
    return {
        id,
        mode:'update',
        type:'categoryUpdate'
    }
});

