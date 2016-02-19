import {get} from 'lodash/object'
import merge from 'lodash/merge'

const initValue = {
    tokens: {}
}

export default function entities(state = initValue, action) {
    const entities = get(action,'payload.reponse.entities');
    if (entities){
        return merge({}, state, entities)
    }

    return state;
}
