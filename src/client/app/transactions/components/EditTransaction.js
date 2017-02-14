import React from 'react';
import { updateTransaction } from '../../actions';
import { connect } from 'react-redux';
import Form from './Form/Form';

class EditTransaction extends React.Component {
    handleSubmit(value) {
        const {transaction, dispatch} = this.props;
        dispatch(updateTransaction({
            id: transaction['_id'],
            name: value
        }));
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit}/>);
    }
}

export default connect((state) => {
    return {
        transaction: state.transactions.selected
    }
})(Form);
