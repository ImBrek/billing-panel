import {Schema, arrayOf, normalize} from 'normalizr';

const token = new Schema('tokens', {idAttribute: 'key'});

const stCategory = new Schema('stCategories');
const stService = new Schema('stServices');
const stOption = new Schema('stOptions');

stCategory.define({
    services: arrayOf(stService)
})

stService.define({
    descendants: arrayOf(stService),
    options: arrayOf(stOption)
})

export default {
    TOKEN: token,
    ST_CATEGORY: stCategory,
    ST_CATEGORY_ARRAY: arrayOf(stCategory),
    ST_SERVICE: stService,
    ST_SERVICE_ARRAY: arrayOf(stService),
};