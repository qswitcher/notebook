import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import { importTransactions } from '../../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class CreditCardImport extends React.Component {
    handleImport = (values) =>  {
        const dispatch = this.props.dispatch;
        dispatch(importTransactions(values));
        this.props.handleClose();
    };

    render() {
        const { dispatch, handleClose, open } = this.props;
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => dispatch(submit('creditCardImport'))}
          />
        ];

        return (
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={true}
              open={open}
              onRequestClose={handleClose}
            >
                <Form onSubmit={this.handleImport}  />
            </Dialog>
        );
    }
}

export default connect()(CreditCardImport);
