import axios from 'axios';

export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK';

const ROOT_URL = '/api/tasks';

export function fetchTasks() {
    const request = axios.get(`${ROOT_URL}`);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: FETCH_TASKS,
                    payload: data
                });
            });
    };
}

export function createTask(task) {
    const request = axios.post(`${ROOT_URL}`, {
            name: task
        });

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: CREATE_TASK,
                    payload: data
                });
            });
    };
}
