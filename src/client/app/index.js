import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.less';
import TaskApp from './tasks';
import Toolbar from './toolbar';

class Hello extends React.Component {
    render() {
        return (
            <div className={styles['body-inner']}>
                <Toolbar/>
                <div className={styles.main}>
                    <TaskApp/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Hello/>, document.getElementById('main'));
