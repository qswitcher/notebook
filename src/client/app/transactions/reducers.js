import {omit, pullAt, differenceWith, isEqual} from 'lodash';
import * as actions from './actions/types';

const today = new Date();
const INITIAL_STATE = {
    all: [],
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    selected: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.SET_CURRENT_MONTH:
        return {
            ...state,
            currentMonth: action.payload
        };
        case actions.SET_CURRENT_YEAR:
        return {
            ...state,
            currentYear: action.payload
        };
        case actions.SELECT_TRANSACTION:
        return {
            ...state,
            selected: action.payload
        };
        case actions.FETCH_TRANSACTIONS:
        return {
            ...state,
            selected: action.payload && action.payload.length ? action.payload[0] : null,
            all: action.payload
        };
        case actions.CREATE_TRANSACTION:
        return {
            ...state,
            all: [action.payload, ...state.all]
        };
        case actions.DELETE_TRANSACTION:
        return {
            ...state,
            selected: [],
            all: state.all.filter(transaction => transaction['_id'] !== action.payload)
        };
        case actions.DELETE_TRANSACTIONS:
        return {
            ...state,
            selected: [],
            all: differenceWith(state.all, action.payload,  isEqual)
        };
        case actions.NEW_TRANSACTION:
        return {
            newTransaction: true,
            ...omit(state, 'selected')
        };
        case actions.SELECT_ALL:
        return {
            ...state,
            selected: state.all.slice(0)
        }
        case actions.SELECT_TRANSACTIONS:
        return {
            ...state,
            selected: pullAt(state.all.slice(0), action.payload)
        }
        case actions.FETCH_STATISTICS:
        return {
            ...state,
            statistics: action.payload
        }
        default:
        return state;
    }
}
