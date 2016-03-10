// import { createAction } from 'redux-actions';
//
// import { CALL_API,API_CREATE } from 'middleware/apiExt';
// import schemas from 'middleware/schemas';
// import { browserHistory } from 'react-router';
//
// export const TOKEN_REQUEST = 'TOKEN_REQUEST';
// export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
// export const TOKEN_FAILURE = 'TOKEN_FAILURE';
//
// export const getToken = createAction('TOKEN_REQUEST', (username, password) => {
//     return {
//         [CALL_API]: {
//             action: API_CREATE,
//             endpoint: 'tokens',
//             params: {
//                 username,
//                 password
//             },
//             types: [TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE],
//             schema: schemas.TOKEN
//         }
//     };
// });
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

