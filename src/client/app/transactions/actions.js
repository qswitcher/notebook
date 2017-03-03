import axios from 'axios';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const SELECT_TRANSACTION = 'SELECT_TRANSACTION';
export const NEW_TRANSACTION = 'NEW_TRANSACTION';

const ROOT_URL = '/api/transactions';

export function newTransaction() {
    return {
        type: NEW_TRANSACTION
    };
};

export function fetchTransactions() {
    const request = axios.get(`${ROOT_URL}`);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: FETCH_TRANSACTIONS,
                    payload: data
                });
            });
    };
}

export function createTransaction(transaction) {
    const request = axios.post(`${ROOT_URL}`, transaction);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: CREATE_TRANSACTION,
                    payload: data
                });
            });
    };
}

export function deleteTransaction(transaction) {
    const id = transaction['_id'];
    const request = axios.delete(`${ROOT_URL}/${id}`, {
            id
        });

    return (dispatch) => {
            request.then(() => {
                dispatch({
                    type: DELETE_TRANSACTION,
                    payload: id
                });
            });
    };
}

export function importTransactions(data) {
    let body = new FormData();
    body.append('importType', data.importType);
    for (let i = 0; i < data.importFile.length; i++) {
        body.append(`importFile[${i}]`, data.importFile[i]);
    }

    let request = axios.post(
        `${ROOT_URL}/import`,
        body
    );

    return (dispatch) => {
        request.then(() => {
            dispatch(fetchTransactions());
        });
    }
}
