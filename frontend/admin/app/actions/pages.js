import { createAction } from 'redux-actions';

export const PAGE_REGISTER = 'PAGE_REGISTER';

export const pageRegister = createAction(PAGE_REGISTER, (name) => {
    return {
        name
    };
});
