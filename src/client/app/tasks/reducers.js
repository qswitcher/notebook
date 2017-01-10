const INITIAL_STATE = {all: []};

import { FETCH_TASKS } from './actions';

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_TASKS:
        return {
            ...state,
            all: action.payload
        };
        default:
        return state;
    }
}
