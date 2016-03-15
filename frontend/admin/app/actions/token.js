import { createAction } from 'redux-actions';

import {CALL_API, API_CREATE, API_READ, API_UPDATE, API_DELETE} from 'services/api';
import schemas from 'services/schemas';

import {createCRUD} from './helpers';

export const TOKEN = createCRUD('TOKEN')

export const createToken = createAction(TOKEN.CREATE.REQUEST, (username, password) => {
    return {
        method: API_CREATE,
        endpoint: `tokens`,
        actions: TOKEN.CREATE,
        schema: schemas.TOKEN,
        body: {
            username,
            password
        }
    }
});

export const deleteToken = createAction(TOKEN.DELETE.REQUEST, () => {
    return {
        method: API_DELETE,
        endpoint: `tokens/0`,
        actions: TOKEN.DELETE,
        schema: schemas.TOKEN
    }
});


//
// export const login = function (username, password) {
//     return function (dispatch) {
//         return dispatch(getToken(username, password)).then((action)=> {
//             //console.log(action);
//             if (action.type == TOKEN_SUCCESS) {
//                 localStorage.setItem('billing.token', JSON.stringify(action.payload.response.entities.tokens[action.payload.response.result]));
//                 browserHistory.push(`/dashboard`);
//             }
//         })
//     }
// }

