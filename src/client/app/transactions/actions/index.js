import axios from 'axios';
import * as actions from './types';

const ROOT_URL = '/api/transactions';

export function newTransaction() {
    return {
        type: actions.NEW_TRANSACTION
    };
};

export function fetchTransactions(params) {
    let query = '';
    if (params) {
        const {currentYear, currentMonth} = params;
        query = `?year=${currentYear}&month=${currentMonth+1}`;
    }
    const request = axios.get(`${ROOT_URL}${query}`);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: actions.FETCH_TRANSACTIONS,
                    payload: data
                });
            });
    };
};

export function fetchStatistics(params) {
    let query = '';
    if (params) {
        const {currentYear} = params;
        query = `?year=${currentYear}`;
    }
    const request = axios.get(`${ROOT_URL}/statistics${query}`);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: actions.FETCH_STATISTICS,
                    payload: data
                });
            });
    };
};

export function createTransaction(transaction) {
    const request = axios.post(`${ROOT_URL}`, transaction);

    return (dispatch) => {
            request.then(({data}) => {
                dispatch({
                    type: actions.CREATE_TRANSACTION,
                    payload: data
                });
            });
    };
};

export function updateTransaction(transaction) {
    const request = axios.put(`${ROOT_URL}/${transaction._id}`, transaction);

    return (dispatch) => {
            request.then(() => fetchTransactions({
                currentMonth: 3,
                currentYear: 2017
            })(dispatch));
    };
};

export function deleteTransaction(transaction) {
    const id = transaction['_id'];
    const request = axios.delete(`${ROOT_URL}/${id}`);

    return (dispatch) => {
            request.then(() => {
                dispatch({
                    type: actions.DELETE_TRANSACTION,
                    payload: id
                });
            });
    };
}

export function importTransactions(data) {
    let body = new FormData();
    body.append('creditCardType', data.creditCardType);
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
};

export function selectTransactions(indices) {
    if (indices === 'all') {
        return {
            type: actions.SELECT_ALL
        }
    }

    return {
        type: actions.SELECT_TRANSACTIONS,
        payload: indices
    }
};

export function deleteSelected(selected) {
    const request = axios.post(`${ROOT_URL}/delete`, selected.map((item) => item['_id']));

    return (dispatch) => {
            request.then(() => {
                dispatch({
                    type: actions.DELETE_TRANSACTIONS,
                    payload: selected
                });
            }).catch((err) => {
                console.error(err);
            });
    };
};

export function updateCurrentMonth(value) {
    return {
        type: actions.SET_CURRENT_MONTH,
        payload: value
    };
};

export function updateCurrentYear(value) {
    return {
        type: actions.SET_CURRENT_YEAR,
        payload: value
    };
};
