import {ORDER} from 'actions/order';
import {ORDER as ORDER_TREE} from 'actions/pages/orders';
import { ENTITY_SELECT } from 'actions/entities';

export default function (state = {
    isFetching: false,
    selectedEntity: {},
}, action) {
    switch (action.type) {
        case ORDER_TREE.READ.REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ORDER_TREE.READ.SUCCESS:
            return Object.assign({},state,{
                isFetching: false,
                orders:action.payload.response.result
            });
         case ORDER_TREE.READ.FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ENTITY_SELECT:
            return Object.assign({}, state, {
                selectedEntity: action.payload
            })

        default:
            return state;

    }
}