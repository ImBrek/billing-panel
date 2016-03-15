import {get} from 'lodash/object'
import merge from 'lodash/merge'
// import mergeWith from 'lodash/mergeWith'

const initValue = {
    tokens: {},
    stCategories:{},
    stServices:{},
    stOptions:{},
    users:{},
    orders:{},
    clients:{}
}

export default function entities(state = initValue, action) {
    const entities = get(action,'payload.response.entities');
    if (entities){
        return merge({},state, entities)
    }

    return state;
}
