import {TOKEN} from 'actions/token';

//КОСТЫЛЬ, Нельзя обращаться к внешним ресурсам из reducers!!!!!!!!!!!
const initialState = JSON.parse(localStorage.getItem('billing.token'));

export default function token(state = initialState, action) {
    switch (action.type) {
        case TOKEN.CREATE.SUCCESS:
            return Object.assign({}, state, action.payload.response.entities.tokens[action.payload.response.result]);
            break;
        case TOKEN.DELETE.SUCCESS:
            return {};
        default:
            return state
    }
}