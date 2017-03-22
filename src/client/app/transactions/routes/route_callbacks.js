import store from 'store';
import { fetchTransactions } from '../actions/index';

export function onTransactionsEnter() {
    store.dispatch(fetchTransactions({
        currentYear: 2017,
        currentMonth: 3
    }));
}
