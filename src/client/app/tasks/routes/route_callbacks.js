import store from 'store';
import { fetchTasks } from '../actions';

export function onTasksEnter() {
    store.dispatch(fetchTasks());
}
