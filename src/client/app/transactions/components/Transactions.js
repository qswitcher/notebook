import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TransactionList from './TransactionList';


const styles = {
  wrapper: {
    margin: '40px'
  }
};

class Transactions extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader
                  title="Transactions"
                />
                <CardText>
                    <TransactionList/>
                </CardText>

              </Card>
        );
    }
}


export default Transactions;
