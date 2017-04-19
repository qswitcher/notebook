import App from './component';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import TransactionsIndex from './transactions';
import Transactions from './transactions/components/Transactions'

const routes =  (
  <Route path="/" component={App} >
    <IndexRedirect to="/transactions" />
    <Route path="transactions" component={TransactionsIndex} >
        <IndexRoute component={Transactions}/>
    </Route>
  </Route>
);

export default routes;
