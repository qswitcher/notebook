import React from 'react';
import commonStyles from 'common.less';
import { createTransaction } from '../../actions';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const {transaction, dispatch} = this.props;
        if (transaction) {
            dispatch(updateTransaction({
                id: transaction['_id'],
                name: this.state.value
            }));
        } else {
            dispatch(createTransaction(this.state.value));
        }
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        const {transaction} = nextProps;
        if (transaction) {
            this.setState({value: transaction.name});
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <textarea className="form-control" rows="10" cols="80" value={this.state.value} onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-info'>{'Save'}</button>
                </div>
            </form>);
    }
}

export default connect((state) => {
    return {
        all: state.transactions.all,
        transaction: state.transactions.selected
    }
})(Form);
