import {SERVICE_CREATE_SHOW,DIALOG_HIDE} from 'actions/dialogs';

export default function token(state = {}, action) {
    switch (action.type) {
        case SERVICE_CREATE_SHOW:
            return {
                type: 'serviceCreate',
                categoryId: action.payload.categoryId
            };
            break;
        case DIALOG_HIDE:
            return {};
            break;
        default:
            return state
    }
}