import { combineReducers } from 'redux';
import TransactionsReducer from './transactions/reducers';

const rootReducer = combineReducers({
    transactions: TransactionsReducer
});

export default rootReducer;
