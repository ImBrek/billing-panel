import {SERVICE_UPDATE_SHOW,DIALOG_HIDE,OPTION_UPDATE_SHOW} from 'actions/dialogs';

export default function token(state = {}, action) {
    switch (action.type) {
        case SERVICE_UPDATE_SHOW:
            return {...action.payload, type: 'serviceUpdate'}
        case OPTION_UPDATE_SHOW:
            return {...action.payload, type: 'optionUpdate'}
        case DIALOG_HIDE:
            return {};
            break;
        default:
            return state
    }
}