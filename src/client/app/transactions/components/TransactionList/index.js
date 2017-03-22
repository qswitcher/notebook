import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import { createTransaction, deleteTransaction, selectTransactions } from '../../actions/index';
import { SELECT_TRANSACTIONS } from '../../actions/types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import DatePicker from './DatePicker';
import Toolbar from './Toolbar';

class TransactionList extends React.Component {
    handleSelected = (indices) => {
        const dispatch = this.props.dispatch;
        dispatch(selectTransactions(indices));
    };

    constructor(props) {
        super(props);
        this.state = {creatingNewItem: false};

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(id) {
        const dispatch = this.props.dispatch;
        dispatch(deleteTransaction(id));
    }

    render() {
        const { creatingNewItem } = this.state;
        const {selected, all, dispatch} = this.props;
        const transactions = all;

        return (
            <div >
                <h1>Transactions</h1>
                <Toolbar/>
                <Table
                    selectable={true}
                    stripedRows={true}
                    multiSelectable={true}
                    onRowSelection={this.handleSelected}>
                    <TableHeader
                        adjustForCheckbox={true}
                        displaySelectAll={true}
                        enableSelectAll={true}>
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Category</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                     displayRowCheckbox={true}
                     deselectOnClickaway={true}
                     showRowHover={true}>
                        {all.map((transaction, index) => (
                            <TableRow key={index} selected={transaction.selected}>
                                <TableRowColumn>{ transaction.date }</TableRowColumn>
                                <TableRowColumn>{ transaction.description }</TableRowColumn>
                                <TableRowColumn>{ transaction.category }</TableRowColumn>
                                <TableRowColumn>{ transaction.amount }</TableRowColumn>
                            </TableRow>
                        ))}
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
