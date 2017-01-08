import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
//import TaskApp from './tasks';
//
// class Hello extends React.Component {
//     render() {
//         return (
//             <div className={styles['body-inner']}>
//                 <Toolbar/>
//                 <div className={styles.main}>
//                     <TaskApp/>
//                 </div>
//             </div>
//         );
//     }
// }

ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('main'));
