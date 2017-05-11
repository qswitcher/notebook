import axios from 'axios';
import * as actions from './types';
import {parseDate} from '../../shared/utils/date_utils';

const ROOT_URL = '/api/transactions';

export function newTransaction() {
    return {
        type: actions.NEW_TRANSACTION
    };
};

export function fetchTransactions(params) {
    let query = '';
    if (params) {
        const {year, month} = params;
        if (year && month) {
            query = `?year=${year}&month=${month}`;
        }
    }

    const request = axios.get(`${ROOT_URL}${query}`);

    return (dispatch) => {
            return request.then(({data}) => {
                dispatch({
                    type: actions.FETCH_TRANSACTIONS,
                    payload: data
                });
            }).catch((err) => {
                dispatch({
                    type: actions.GENERAL_ERROR,
                    payload: err
                });
            });
    };
};

export function fetchStatistics(params) {
    let query = '';
    if (params) {
        const {year} = params;
        query = `?year=${year}`;
    }
    const request = axios.get(`${ROOT_URL}/statistics${query}`);

    return (dispatch) => {
        return request.then(({data}) => {
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
        return request.then(({data}) => {
            dispatch({
                type: actions.CREATE_TRANSACTION,
                payload: data
            });
        }).catch((err) => {
            dispatch({
                type: actions.GENERAL_ERROR,
                payload: err
            });
        });
    };
};

/**
* Updates a transaction and calls FETCH_TRANSACTIONS to get all the updated
* transactions that occur in the same month as "transaction"
*/
export function updateTransaction(transaction) {
    const request = axios.put(`${ROOT_URL}/${transaction._id}`, transaction);

    const date = parseDate(transaction.date);
    return dispatch => {
            return request.then(() => fetchTransactions({
                month: parseInt(date.getMonth(), 10) + 1,
                year: date.getFullYear()
            })(dispatch))
            .catch((err) => {
                dispatch({
                    type: actions.GENERAL_ERROR,
                    payload: err
                });
            });
    };
};

export function deleteTransaction(transaction) {
    const id = transaction['_id'];
    const request = axios.delete(`${ROOT_URL}/${id}`);

    return (dispatch) => {
            return request.then(() => {
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

    return dispatch => {
        request.then(() => {
            dispatch(fetchTransactions());
        })
        .catch((err) => {
            dispatch({
                type: actions.GENERAL_ERROR,
                payload: err
            });
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
            return request.then(() => {
                dispatch({
                    type: actions.DELETE_TRANSACTIONS,
                    payload: selected
                });
            }).catch((err) => {
                dispatch({
                    type: actions.GENERAL_ERROR,
                    payload: err
                });
            });
    };
};
