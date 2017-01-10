import { combineReducers } from 'redux';
import TasksReducer from './tasks/reducers';

const rootReducer = combineReducers({
    tasks: TasksReducer
});

export default rootReducer;
