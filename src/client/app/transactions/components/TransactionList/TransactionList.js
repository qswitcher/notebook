import React from 'react';
import styles from './styles.less';
import CreateForm from '../TransactionForm';
import CreditCardImport from '../CreditCardImport';
import { connect } from 'react-redux';
import { createTransaction, deleteTransaction, SELECT_TRANSACTION } from '../../actions';

const TransactionItem = ({transaction, onDelete, onSelect, selected}) => {
    return (
        <tr>
            <td>{ transaction.date }</td>
            <td>{ transaction.description }</td>
            <td>{ transaction.category }</td>
            <td>{ transaction.amount }</td>
            <td>
                <button type="button" className="close" aria-label="Close" onClick={() => onDelete(transaction)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </td>
        </tr>
    )
};

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {creatingNewItem: false};

        this.toggleForm = this.toggleForm.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    toggleForm(event) {
        this.setState({creatingNewItem: !this.state.creatingNewItem});
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

    handleCreate(values) {
        const dispatch = this.props.dispatch;
        dispatch(createTransaction(values));
    }

    render() {
        const { creatingNewItem } = this.state;
        const {selected, all, dispatch} = this.props;

        const transactions = all.map((transaction) => {
            return (<TransactionItem
                key={transaction['_id']}
                transaction={transaction}
                selected={selected && transaction['_id'] == selected['_id']}
                onDelete={this.onDelete}
                onSelect={this.onSelect}
                />)
        });

        const showFormBtn = (<button className="btn btn-success" type="button" onClick={this.toggleForm}>Create</button>);

        return (
            <div className={styles['transaction-list']}>
                <h1>Transactions</h1>
                { creatingNewItem ? <CreateForm onSubmit={this.handleCreate} handleClose={this.toggleForm} /> : showFormBtn }
                <CreditCardImport/>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>{'Date'}</th>
                            <th>{'Description'}</th>
                            <th>{'Category'}</th>
                            <th>{'Amount'}</th>
                            <th>{'Delete'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions}
                    </tbody>
                </table>
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
