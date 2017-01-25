import axios from 'axios';

export const FETCH_TASKS = 'FETCH_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

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

export function deleteTask(task) {
    const id = task['_id'];
    const request = axios.delete(`${ROOT_URL}/${id}`, {
            id
        });

    return (dispatch) => {
            request.then(() => {
                dispatch({
                    type: DELETE_TASK,
                    payload: id
                });
            });
    };
}
