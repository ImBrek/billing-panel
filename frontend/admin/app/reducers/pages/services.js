import {cloneDeep} from 'lodash/lang'

import { ENTITY_SELECT } from 'actions/entities';
import { CATEGORY_REQUEST,CATEGORY_SUCCESS,CATEGORY_FAILURE } from 'actions/categories'

export default function (state = {
    isFetching: false,
    selectedEntity: {}
}, action) {
    let newState;
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case CATEGORY_SUCCESS:
        case CATEGORY_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case ENTITY_SELECT:
            return Object.assign({}, state, {
                selectedEntity: action.payload
            })
        default:
            return state;

    }
}