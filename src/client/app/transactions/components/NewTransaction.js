import React from 'react';
import { createTransaction } from '../actions';
import { connect } from 'react-redux';
import Form from './Form/Form';

class NewTransaction extends React.Component {
    handleSubmit(value) {
        const {dispatch} = this.props;
        dispatch(createTransaction(value));
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit}/>
        );
    }
}

export default connect()(NewTransaction);
