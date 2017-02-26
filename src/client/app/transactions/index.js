import React from 'react';
import styles from './styles.less';

class FinanceApp extends React.Component {
    render() {
        return <div className={styles['transactions-container']}>
                {this.props.children}
            </div>
    }
}

export default FinanceApp;
