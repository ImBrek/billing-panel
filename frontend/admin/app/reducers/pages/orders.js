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
        default:
            return state;

    }
}