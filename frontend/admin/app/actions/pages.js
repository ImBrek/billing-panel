import { createAction } from 'redux-actions';

export const PAGE_ACTIVATE = 'PAGE_ACTIVATE';

export const pageActivate = createAction(PAGE_ACTIVATE, (name) => {
    return {
        name
    };
});
