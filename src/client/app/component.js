import React from 'react';
import styles from './styles.less';
import Toolbar from './toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
  render() {
    return (
     <MuiThemeProvider>
          <div className={styles['body-inner']}>
               <Toolbar/>
               <div className={styles.main}>
                {this.props.children}
               </div>
          </div>
      </MuiThemeProvider>
    );
  }
}
