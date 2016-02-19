import {TOKEN_REQUEST,TOKEN_SUCCESS,TOKEN_FAILURE} from 'actions/tokens';

//КОСТЫЛЬ, Нельзя обращаться к внешним ресурсам из reducers!!!!!!!!!!!
const initialState = JSON.parse(localStorage.getItem('billing.token'));

export default function token(state = initialState, action) {
    switch (action.type) {
        case TOKEN_SUCCESS:
            return Object.assign({}, state, action.payload.response.entities.tokens[action.payload.response.result]);
            break;
        default:
            return state
    }
}