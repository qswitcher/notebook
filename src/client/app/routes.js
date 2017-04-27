import App from './component';
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import TransactionsIndex from './transactions';
import TransactionList from './transactions/components/TransactionList';
import Summary from './transactions/components/Summary'

const routes =  (
  <Route path="/" component={App} >
    <IndexRedirect to="/transactions" />
    <Route path="transactions" component={TransactionsIndex} >
        <IndexRoute component={TransactionList}/>
        <Route path="list" component={TransactionList}/>
        <Route path="summary" component={Summary}/>
    </Route>
  </Route>
);

export default routes;
