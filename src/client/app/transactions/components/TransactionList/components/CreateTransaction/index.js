import React from 'react';
import commonStyles from 'common.less';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { SelectField, TextField } from 'redux-form-material-ui';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import { createTransaction } from '../../../../actions/index';

import Form from './Form';

class CreateTransaction extends React.Component {
    handleCreate= (values) => {
        const dispatch = this.props.dispatch;
        dispatch(createTransaction(values));
        this.props.handleClose();
    };

    render() {
        const { handleClose, dispatch, open } = this.props;

        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => dispatch(submit('newTransaction'))}
          />
        ];

        return (
            <Dialog
              title="Create Transaction"
              actions={actions}
              modal={true}
              open={open}
              onRequestClose={handleClose}
            >
                <Form onSubmit={this.handleCreate}/>
            </Dialog>
        );
    }
}

export default connect()(CreateTransaction);
