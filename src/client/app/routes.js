import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './component';
import TasksIndex from './tasks';
import TasksNew from './tasks/components/Form/Form';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={TasksIndex} />
    <Route path="tasks/new" component={ TasksNew } />
  </Route>
);
