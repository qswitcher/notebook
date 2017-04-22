import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TransactionList from './TransactionList';
import SpendingChart from './SpendingChart';

const styles = {
  wrapper: {
    margin: '40px'
  }
};

class Transactions extends React.Component {
    render() {
        return (
            <div>
            <Card>
                <CardHeader
                  title="Chart"
                />
                <CardText>
                    <SpendingChart/>
                </CardText>

              </Card>
              <Card>
                  <CardHeader
                    title="Transactions"
                  />
                  <CardText>
                      <TransactionList/>
                  </CardText>

                </Card>
          </div>
        );
    }
}


export default Transactions;
