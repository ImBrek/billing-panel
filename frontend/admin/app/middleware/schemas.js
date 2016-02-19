import { Schema, arrayOf, normalize } from 'normalizr';

const token = new Schema('tokens', {idAttribute: 'key'});

export default {
    TOKEN: token
};