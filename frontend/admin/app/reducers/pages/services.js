import {cloneDeep} from 'lodash/lang'

import { CATEGORY_REQUEST,CATEGORY_SUCCESS,CATEGORY_FAILURE } from 'actions/categories'

const initialState = {
    servicesTree: {
        isFetching: false
    }
};

export default function (state = initialState, action) {
    let newState;
    switch (action.type) {
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