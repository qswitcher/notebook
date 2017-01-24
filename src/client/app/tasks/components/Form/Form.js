import React from 'react';
import commonStyles from 'common.less';
import { createTask } from '../../actions';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.dispatch(createTask(this.state.value));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea rows="4" cols="50" value={this.state.value} onChange={this.handleChange}></textarea>
                <button type="submit" className={commonStyles.btn}>{'Submit'}</button>
            </form>);
    }
}

export default connect((state) => {
    return {
        all: state.tasks.all
    }
})(Form);
