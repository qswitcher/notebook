const INITIAL_STATE = {all: []};

import { FETCH_TASKS, CREATE_TASK, DELETE_TASK, SELECT_TASK } from './actions';

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SELECT_TASK:
        return {
            ...state,
            selected: action.payload
        };
        case FETCH_TASKS:
        return {
            ...state,
            all: action.payload
        };
        case CREATE_TASK:
        return {
            ...state,
            all: [action.payload, ...state.all]
        };
        case DELETE_TASK:
        return {
            ...state,
            all: state.all.filter(task => task['_id'] !== action.payload)
        };
        default:
        return state;
    }
}
