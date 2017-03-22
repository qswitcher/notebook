import React from 'react';
import commonStyles from 'common.less';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { SelectField, TextField } from 'redux-form-material-ui';
import { submit } from 'redux-form'

const validate = (values) => {
    const errors = {};
    if (!values.date) {
        errors.date = 'Required';
    }
    if (isNaN(Date.parse(values.date))) {
        errors.date = 'Invalid Date';
    }
    return errors;
};

class Form extends React.Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="date"
                    component={TextField}
                    placeholder="YYYY-MM-dd"/>
                <Field
                    name="amount"
                    component={TextField}
                    placeholder="Amount"/>
                <Field
                    name="description"
                    component={TextField}
                    placeholder="Description"/>
                <Field
                    name="category"
                    component={SelectField}
                    hintText="Category">
                    <MenuItem value="home_improvement" primaryText="Home Improvement"/>
                    <MenuItem value="groceries" primaryText="Groceries"/>
                </Field>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newTransaction',
    validate
})(Form);
