import { createAction } from 'redux-actions';


export const CATEGORY_CREATE_SHOW = 'DIALOGS/SERVICE_UPDATE_SHOW';


export const categoryUpdateShow = createAction(CATEGORY_CREATE_SHOW);

export const SERVICE_UPDATE_SHOW = 'DIALOGS/SERVICE_UPDATE_SHOW';

export const serviceUpdateShow = createAction(SERVICE_UPDATE_SHOW,(id)=>{
    return {
        id,
        mode:'update'
    }
});

export const serviceCreateShow = createAction(SERVICE_UPDATE_SHOW,(categoryId)=>{
    return {
        categoryId,
        model:'create'
    }
});

export const DIALOG_HIDE = 'DIALOGS/HIDE';

export const hideDialog = createAction(DIALOG_HIDE);
