import { TREE_REQUEST,TREE_SUCCESS,TREE_FAILURE } from 'actions/pages/services'
import { NEXT,PREV,SET } from 'actions/pages/orders'

export default function (state = {
    isFetching: false,
    selectedEntity: {},
    currentPage:0,
    categories:[]
}, action) {
    switch (action.type) {
        case TREE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case TREE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                categories:action.payload.response.result
            });
        case TREE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case NEXT:
            return Object.assign({}, state, {
                currentPage:state.currentPage + 1
            });
        case PREV:
            return Object.assign({}, state, {
                currentPage:state.currentPage - 1
            });
        case SET:
            if (state.currentPage>action.payload){
                return Object.assign({}, state, {
                    currentPage:action.payload
                });
            } else {
                return state;
            }
        default:
            return state;

    }
}