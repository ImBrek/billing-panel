import {ORDER} from 'actions/order';

export default function (state = {
    isFetching: false,
    selectedEntity: {},
}, action) {
    switch (action.type) {
        case ORDER.READ.REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ORDER.READ.SUCCESS:
            return Object.assign({},state,{
                isFetching: false,
                orders:action.payload.response.result
            });
         case ORDER.READ.FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;

    }
}