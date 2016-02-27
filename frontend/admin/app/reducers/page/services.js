import {cloneDeep} from 'lodash/lang'

import { PAGE_REGISTER } from 'actions/pages';
import { CATEGORY_REQUEST,CATEGORY_SUCCESS,CATEGORY_FAILURE } from 'actions/categories'

export default function (state, action) {
    let newState;
    switch (action.type) {
        case PAGE_REGISTER:
            return {
                name: 'services',
                servicesTree: {
                    isFetching: false
                }
            }
        case CATEGORY_REQUEST:
            newState = cloneDeep(state);
            newState.servicesTree.isFetching = true;
            return newState
        case CATEGORY_SUCCESS:
        case CATEGORY_FAILURE:
            newState = cloneDeep(state);
            newState.servicesTree.isFetching = false;
            return newState
        default:
            return state;

    }
}