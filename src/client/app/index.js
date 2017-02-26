import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('main'));
