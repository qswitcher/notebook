import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { newTransaction, deleteTransaction, SELECT_TRANSACTION } from '../../actions';

const Transaction = ({transaction, onDelete, onSelect, selected}) => {
    return (
        <li className={`${styles.transaction} ${selected ? styles.selected : ''}`} onClick={() => onSelect(transaction)}>
            <span>{ transaction.name }</span>
            <button
                onClick={() => onDelete(transaction)}
                type="button"
                className="close"
                aria-label="Close">
                <span aria-hidden="true">&times;</span><
            /button>
        </li>
    );
};

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onDelete(id) {
        const dispatch = this.props.dispatch;
        dispatch(deleteTransaction(id));
    }

    onSelect(transaction) {
        const dispatch = this.props.dispatch;
        dispatch({
            type: SELECT_TRANSACTION,
            payload: transaction
        })
    }

    render() {
        const {selected, all, dispatch} = this.props;

        const transactions = all.map((transaction) => {
            return (<Transaction
                key={transaction['_id']}
                transaction={transaction}
                selected={selected && transaction['_id'] == selected['_id']}
                onDelete={this.onDelete}
                onSelect={this.onSelect}
                />)
        });

        return (
            <div className={styles['transaction-list']}>
                <h1>Transactions</h1>
                <Link className='btn btn-success' to='/transactions/new'>Create New</Link>
                <ul>{transactions}</ul>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        all: state.transactions.all,
        selected: state.transactions.selected
    }
})(TransactionList);
