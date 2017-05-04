import React from 'react';
import styles from './styles.less';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { SELECT_TRANSACTIONS } from '../../actions/types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toolbar from './components/Toolbar';
import CategoryDropdown from './components/CategoryDropdown';

class TransactionList extends React.Component {
    handleSelected = (indices) => {
        const { selectTransactions }  = this.props;
        selectTransactions(indices);
    };

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        const { fetchTransactions } = this.props;
        fetchTransactions(this.props.location.query);
    }

    componentWillUpdate(nextProps) {
        const { fetchTransactions } = nextProps;
        const query = this.props.location.query;
        const nextQuery = nextProps.location.query;
        if (query.year != nextQuery.year || query.month != nextQuery.month) {
            fetchTransactions(nextQuery);
        }
    }

    onDelete(id) {
        const { deleteTransaction } = this.props;
        deleteTransaction(id);
    }

    handleUpdateCategory(category, transaction) {
        const { updateTransaction } = this.props;
        updateTransaction(Object.assign({}, transaction, {category}));
    }

    render() {
        const { selected, all, location } = this.props;
        const transactions = all;

        return (
            <div >
                <Toolbar {...location}/>
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
                                <TableRowColumn><CategoryDropdown value={transaction.category} onChange={(category) => this.handleUpdateCategory(category, transaction)}/></TableRowColumn>
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
