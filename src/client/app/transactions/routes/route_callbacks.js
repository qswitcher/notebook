import store from 'store';
import { fetchTransactions } from '../actions';

export function onTransactionsEnter() {
    store.dispatch(fetchTransactions());
}
