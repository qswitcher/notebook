import axios from 'axios';

export const FETCH_TASKS = 'FETCH_TASKS';

const ROOT_URL = 'http://localhost:3000/api/tasks';

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
