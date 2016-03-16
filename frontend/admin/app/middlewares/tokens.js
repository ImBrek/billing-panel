import {API_READ, API_UPDATE, API_CREATE, API_DELETE} from 'services/api';

export default store => next => action => {
    let result = next(action);
    if (action.payload && [API_READ, API_UPDATE, API_CREATE, API_DELETE].indexOf(action.payload.method) != -1){
        const {token} = store.getState();
        if (token){
            action.payload.headers || (action.payload.headers = {});
            action.payload.headers['Authorization'] = `Bearer ${token.accessToken}`;
        }
    }
    return result
}