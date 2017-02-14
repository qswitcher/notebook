const INITIAL_STATE = {all: []};
import {omit} from 'lodash';
import { FETCH_TRANSACTIONS, CREATE_TRANSACTION, DELETE_TRANSACTION, SELECT_TRANSACTION, NEW_TRANSACTION } from './actions';

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SELECT_TRANSACTION:
        return {
            ...state,
            selected: action.payload
        };
        case FETCH_TRANSACTIONS:
        return {
            ...state,
            selected: action.payload && action.payload.length ? action.payload[0] : null,
            all: action.payload
        };
        case CREATE_TRANSACTION:
        return {
            ...state,
            all: [action.payload, ...state.all]
        };
        case DELETE_TRANSACTION:
        return {
            ...state,
            all: state.all.filter(transaction => transaction['_id'] !== action.payload)
        };
        case NEW_TRANSACTION:
        return {
            newTransaction: true,
            ...omit(state, 'selected')
        };
        default:
        return state;
    }
}
