import {get} from 'lodash/object'
import merge from 'lodash/merge'

const initValue = {
    tokens: {},
    stCategories:{},
    stServices:{},
    stOptions:{},
    stValues:{}
}

export default function entities(state = initValue, action) {
    if (action.meta && action.meta.normalizr){
        return merge({}, state, action.payload.entities)
    }

    return state;
}
