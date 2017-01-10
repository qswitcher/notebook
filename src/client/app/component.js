import React from 'react';
import styles from './styles.less';
import Toolbar from './toolbar';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles['body-inner']}>
           <Toolbar/>
           <div className={styles.main}>
            {this.props.children}
           </div>
      </div>
    );
  }
}
