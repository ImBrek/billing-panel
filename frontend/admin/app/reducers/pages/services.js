import { ENTITY_SELECT } from 'actions/entities';
import { TREE_REQUEST,TREE_SUCCESS,TREE_FAILURE } from 'actions/pages/services'

export default function (state = {
    isFetching: false,
    selectedEntity: {}
}, action) {
    switch (action.type) {
        case TREE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case TREE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                categories:action.payload.response.result
            })
        case TREE_FAILURE:
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