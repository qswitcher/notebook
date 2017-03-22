import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import CreateForm from '../CreateTransaction';
import CreditCardImport from '../CreditCardImport';
import {connect} from 'react-redux';
import {deleteSelected} from '../../actions/index'

class CustomToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      showImport: false
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  handleActionsMenu = (event, value) => {
    this.setState({[value]: true});
  };

  handleDelete = () => {
     this.props.dispatch(deleteSelected(this.props.selected));
  };

  closeModals = () => {
    this.setState({
        showCreate: false,
        showImport: false
    });
  };

  render() {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const years = [2017, 2016];
    return (
        <div>
            <CreateForm open={this.state.showCreate} handleClose={this.closeModals}/>
            <CreditCardImport open={this.state.showImport} handleClose={this.closeModals}/>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
                <IconMenu
                  iconButtonElement={
                    <IconButton touch={true}>
                      <NavigationExpandMoreIcon />
                    </IconButton>
                  }
                  onChange={this.handleActionsMenu}
                >
                  <MenuItem primaryText="Create" value="showCreate"/>
                  <MenuItem primaryText="Import" value="showImport"/>
                </IconMenu>
                <DropDownMenu value={this.props.currentMonth} onChange={this.handleChange}>
                    {months.map((month, i) => {
                        return (
                            <MenuItem key={i} value={i} primaryText={month} />
                        )
                    })}
                 </DropDownMenu>
                 <DropDownMenu value={this.props.currentYear} onChange={this.handleChange}>
                     {years.map((year) => {
                         return (
                             <MenuItem key={year} value={year} primaryText={year} />
                         )
                     })}
                  </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
          <ToolbarTitle />
              <ToolbarSeparator />
              <RaisedButton label="Delete Selected" secondary={true} onTouchTap={this.handleDelete} />
            </ToolbarGroup>
          </Toolbar>
      </div>
    );
  }
}

export default connect((state) => ({
    currentYear: state.transactions.currentYear,
    currentMonth: state.transactions.currentMonth,
    selected: state.transactions.selected
}))(CustomToolbar);
