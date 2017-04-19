import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { SELECT_TRANSACTIONS } from '../../actions/types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import DatePicker from './DatePicker';
import Toolbar from './Toolbar';

class TransactionList extends React.Component {
    handleSelected = (indices) => {
        const { selectTransactions }  = this.props;
        selectTransactions(indices);
    };

    constructor(props) {
        super(props);
        this.state = {creatingNewItem: false};
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        const { currentYear, currentMonth, fetchTransactions } = this.props;
        fetchTransactions({
            currentYear,
            currentMonth
        });
    }

    componentWillUpdate(nextProps) {
        const { currentYear, currentMonth, fetchTransactions } = nextProps;
        if (this.props.currentYear != currentYear || this.props.currentMonth != currentMonth) {
            fetchTransactions({
                currentYear,
                currentMonth
            });
        }
    }

    onDelete(id) {
        const { deleteTransaction } = this.props;
        deleteTransaction(id);
    }

    render() {
        const { creatingNewItem } = this.state;
        const { selected, all } = this.props;
        const transactions = all;

        return (
            <div >
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
                            <TableHeaderColumn>Type</TableHeaderColumn>
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
                                <TableRowColumn>{ transaction.creditCardType }</TableRowColumn>
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
        selected: state.transactions.selected,
        currentMonth: state.transactions.currentMonth,
        currentYear: state.transactions.currentYear
    }
}, actions)(TransactionList);
