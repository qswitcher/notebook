import React from 'react';
import styles from './styles.less';
import CreateForm from '../TransactionForm';
import CreditCardImport from '../CreditCardImport';
import { connect } from 'react-redux';
import { createTransaction, deleteTransaction, SELECT_TRANSACTION } from '../../actions';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const TransactionItem = ({transaction, onDelete, onSelect, selected}) => {
    return (
        <TableRow>
            <TableRowColumn>{ transaction.date }</TableRowColumn>
            <TableRowColumn>{ transaction.description }</TableRowColumn>
            <TableRowColumn>{ transaction.category }</TableRowColumn>
            <TableRowColumn>{ transaction.amount }</TableRowColumn>
            <TableRowColumn>
                <button type="button" className="close" aria-label="Close" onClick={() => onDelete(transaction)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </TableRowColumn>
        </TableRow>
    )
};

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {creatingNewItem: false};

        this.handleCreate = this.handleCreate.bind(this);
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
                <CreateForm onSubmit={this.handleCreate} />
                <CreditCardImport/>
                <Table
                    displayRowCheckbox={false}
                    stripedRows={true}>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Category</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions}
                    </TableBody>
                </Table>
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
