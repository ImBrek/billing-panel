const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const UPDATE = 'UPDATE';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const READ = 'READ';

export function createRequestTypes (base) {
    const res = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
    return res;
}

export function createCRUD (base) {
    const result = {};
    [READ,CREATE,UPDATE,DELETE].forEach((method)=>{
        result[method] = createRequestTypes(`${base}_${method}`)
    });
    return result;
}