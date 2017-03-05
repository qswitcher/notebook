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

class TransactionForm extends React.Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const { handleSubmit, handleClose } = this.props;

        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => dispatch(submit('newTransaction'))}
          />
        ];

        return (
            <div>
                <RaisedButton
                    label="Create"
                    onTouchTap={this.handleOpen}/>
                <Dialog
                  title="Create Transaction"
                  actions={actions}
                  modal={true}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
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
                </Dialog>
            </div>
        );
    }
}

export default reduxForm({
    form: 'newTransaction',
    validate
})(TransactionForm);
