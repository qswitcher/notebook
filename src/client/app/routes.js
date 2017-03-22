import App from './component';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import TransactionsIndex from './transactions';
import TransactionsList from './transactions/components/TransactionList'
import { onTransactionsEnter } from './transactions/routes/route_callbacks';

const routes =  (
  <Route path="/" component={App} >
    <IndexRedirect to="/transactions" />
    <Route path="transactions" component={TransactionsIndex} onEnter={onTransactionsEnter}>
        <IndexRoute component={TransactionsList}/>
    </Route>
  </Route>
);

export default routes;
