import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


class CreditCardImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.handleImport = this.handleImport.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
        console.log('openning');
    }

    handleImport(values) {
        const dispatch = this.props.dispatch;
        console.log('submitted');
        console.log(values);
        // dispatch(importTransactions(values));
    }

    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <Button
                    bsStyle="primary"
                    onClick={this.open}>
                    Import
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Import Transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleImport} handleClose={this.toggleForm} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect()(CreditCardImport);
