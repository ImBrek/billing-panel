import { Schema, arrayOf, normalize } from 'normalizr';

const token = new Schema('tokens', {idAttribute: 'key'});

const stCategory = new Schema('stCategories');
const stService = new Schema('stServices');
const stOption = new Schema('stOptions');
const stValue = new Schema('stValues');

stCategory.define({
    services:arrayOf(stService)
})

stService.define({
    options:arrayOf(stOption)
})

stOption.define({
    values:arrayOf(stValue)
})

export default {
    TOKEN: token,
    ST_CATEGORY:stCategory,
    ST_CATEGORY_ARRAY:arrayOf(stCategory),
    ST_SERVICE:stService
};