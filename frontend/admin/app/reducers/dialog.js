import {DIALOG_TYPE,DIALOG_HIDE} from 'actions/dialogs/index'

export default function token (state = {}, action) {
    if (action.payload && action.payload[DIALOG_TYPE]) {
        const type = action.payload[DIALOG_TYPE];
        delete action.payload[DIALOG_TYPE];
        return {
            ...action.payload,
            type
        }
    }
    if ( action.type == DIALOG_HIDE)
        return {};
    
    return state
}