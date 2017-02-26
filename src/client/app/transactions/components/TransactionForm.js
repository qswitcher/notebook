import React from 'react';
import commonStyles from 'common.less';
import { Field, reduxForm } from 'redux-form';

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

const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => {
    const divClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
    const inputClassName = `form-control ${touched && error ? 'form-control-danger' : ''}`;
    return (
        <div className={divClassName}>
          <input {...input} placeholder={placeholder} type={type} className={inputClassName}/>
        </div>
    );
};

class TransactionForm extends React.Component {
    render() {
        const { handleSubmit, handleClose } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit}>
                <button className="btn btn-danger" type="button" onClick={handleClose}>Cancel</button>
                <Field
                    name="date"
                    component={renderField}
                    type="text"
                    placeholder="YYYY-MM-dd"/>
                <Field
                    name="amount"
                    component={renderField}
                    type="text"
                    placeholder="Amount"/>
                <Field
                    name="description"
                    component={renderField}
                    type="text"
                    placeholder="Description"/>
                <Field
                    name="category"
                    component="select"
                    className="form-control" >
                    <option>Category</option>
                    <option value="Home Improvement">Home Improvement</option>
                    <option value="Groceries">Groceries</option>
                </Field>
                <button type="submit" className='btn btn-info'>{'Create'}</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newTransaction',
    validate
})(TransactionForm);
