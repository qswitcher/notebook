const INITIAL_STATE = {all: []};

import { FETCH_TASKS, CREATE_TASK } from './actions';

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_TASKS:
        return {
            ...state,
            all: action.payload
        };
        case CREATE_TASK:
        return {
            ...state,
            all: [action.payload, ...state.all]
        }
        default:
        return state;
    }
}
