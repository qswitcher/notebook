import React from 'react';
import FlatButtonLink from '../shared/components/FlatButtonLink';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class FinanceApp extends React.Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    <div>
                        <FlatButtonLink to="/transactions/list">Transactions</FlatButtonLink>
                        <FlatButtonLink  to="/transactions/summary">Summary</FlatButtonLink>
                    </div>
                </CardHeader>
                <CardText>
                    {this.props.children}
                </CardText>
              </Card>

        );
    }
}

export default FinanceApp;
