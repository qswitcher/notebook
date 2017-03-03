import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import { importTransactions } from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class CreditCardImport extends React.Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleImport = (values) =>  {
        const dispatch = this.props.dispatch;
        dispatch(importTransactions(values));
        this.handleClose();
    };

    render() {
        const { dispatch } = this.props;
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={() => dispatch(submit('creditCardImport'))}
          />
        ];

        return (
            <div>
                <RaisedButton
                    label="Import"
                    onTouchTap={this.handleOpen}/>
                <Dialog
                  title="Dialog With Actions"
                  actions={actions}
                  modal={true}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                    <Form onSubmit={this.handleImport} handleClose={this.toggleForm} />
                </Dialog>
            </div>
        );
    }
}

export default connect()(CreditCardImport);
