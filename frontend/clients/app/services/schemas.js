import {Schema, arrayOf, normalize} from 'normalizr';

const token = new Schema('tokens', {idAttribute: 'userId'});

const stCategory = new Schema('stCategories');
const stService = new Schema('stServices');
const stOption = new Schema('stOptions');

const order = new Schema('orders');
const orderedService = new Schema('orderedServices');

const user = new Schema('users');
const client = new Schema('clients');

stCategory.define({
    services: arrayOf(stService)
});

stService.define({
    descendants: arrayOf(stService),
    options: arrayOf(stOption)
});

order.define({
    orderedServices: arrayOf(orderedService),
    client: client
});

orderedService.define({
    service: stService,
    option: stOption
});

export default {
    TOKEN: token,
    ST_CATEGORY: stCategory,
    ST_CATEGORY_ARRAY: arrayOf(stCategory),
    ST_SERVICE: stService,
    ST_SERVICE_ARRAY: arrayOf(stService),
    USER: user,
    ORDER: order,
    ORDER_ARRAY: arrayOf(order)
};