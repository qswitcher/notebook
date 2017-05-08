import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { dateOrToday } from '../../../shared/utils/date_utils';
import TransactionTable from './components/TransactionTable';

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
        fetchTransactions(dateOrToday(this.props.location.query));
    }

    componentWillUpdate(nextProps) {
        const { fetchTransactions } = nextProps;
        const query = this.props.location.query;
        const nextQuery = nextProps.location.query;
        if (query.year != nextQuery.year || query.month != nextQuery.month) {
            fetchTransactions(dateOrToday(nextQuery));
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
            <TransactionTable
            transactions={all}
            handleUpdateCategory={this.handleUpdateCategory.bind(this)}
            onDelete={this.onDelete.bind(this)}
            {...this.props}/>
        );
    }
}

export default connect((state) => {
    return {
        all: state.transactions.all,
        selected: state.transactions.selected
    }
}, actions)(TransactionList);
