import App from './component';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import TasksIndex from './tasks';
import TasksNew from './tasks/components/Form/Form';
import { onTasksEnter } from './tasks/routes/route_callbacks';

const routes =  (
  <Route path="/" component={App} >
    <IndexRoute component={ TasksIndex } onEnter={onTasksEnter}/>
    <Route path="/new" component={ TasksNew } />
  </Route>
);

export default routes;
