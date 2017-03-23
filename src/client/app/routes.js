import App from './component';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import TransactionsIndex from './transactions';
import TransactionsList from './transactions/components/TransactionList'

const routes =  (
  <Route path="/" component={App} >
    <IndexRedirect to="/transactions" />
    <Route path="transactions" component={TransactionsIndex} >
        <IndexRoute component={TransactionsList}/>
    </Route>
  </Route>
);

export default routes;
