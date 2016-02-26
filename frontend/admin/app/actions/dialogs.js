import { createAction } from 'redux-actions';


export const CATEGORY_CREATE_SHOW = 'DIALOGS_CATEGORY_CREATE_SHOW';


export const categoryCreateShow = createAction(CATEGORY_CREATE_SHOW);

export const SERVICE_CREATE_SHOW = 'DIALOGS_SERVICE_CREATE_SHOW';

export const serviceCreateShow = createAction(SERVICE_CREATE_SHOW,(categoryId)=>{
    return {
        categoryId
    }
});

export const DIALOG_HIDE = 'DIALOGS_HIDE';

export const hideDialog = createAction(DIALOG_HIDE);
