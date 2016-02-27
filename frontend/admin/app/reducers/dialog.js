import {SERVICE_UPDATE_SHOW,DIALOG_HIDE} from 'actions/dialogs';

export default function token(state = {}, action) {
    switch (action.type) {
        case SERVICE_UPDATE_SHOW:
            return {...action.payload, type: 'serviceUpdate'}
        case DIALOG_HIDE:
            return {};
            break;
        default:
            return state
    }
}