import {TOKEN_REQUEST,TOKEN_FAILURE,TOKEN_SUCCESS} from 'actions/tokens';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOKEN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case TOKEN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            })
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.payload.non_field_errors[0],
                isFetching: false
            })
        default:
            return state;

    }
}