import { combineReducers } from 'redux';
import TransactionsReducer from './transactions/reducers';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    transactions: TransactionsReducer,
    form: formReducer
});

export default rootReducer;
