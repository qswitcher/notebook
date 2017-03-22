import React from 'react';
import styles from './styles.less';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <AppBar
                title="Finances"
                onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                    <AppBar
                    showMenuIconButton={false}
                    title="Finances"
                    onTitleTouchTap={this.handleToggle}
                    />
                  <MenuItem>Menu Item</MenuItem>
                  <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default Toolbar;
