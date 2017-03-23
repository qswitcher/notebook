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
import * as actions from '../../actions/index';

class CustomToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      showImport: false
    };
  }

  handleCurrentMonthChange = (event, index, value) => {
      const { updateCurrentMonth } = this.props;
      updateCurrentMonth(value);
  };

  handleCurrentYearChange = (event, index, value) => {
      const { updateCurrentYear } = this.props;
      updateCurrentYear(value);
  };

  handleActionsMenu = (event, value) => {
    this.setState({[value]: true});
  };

  handleDelete = () => {
     const { dispatch, deleteSelected, selected} = this.props;
     deleteSelected(selected);
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
                <DropDownMenu value={this.props.currentMonth} onChange={this.handleCurrentMonthChange}>
                    {months.map((month, i) => {
                        return (
                            <MenuItem key={i} value={i} primaryText={month} />
                        )
                    })}
                 </DropDownMenu>
                 <DropDownMenu value={this.props.currentYear} onChange={this.handleCurrentYearChange}>
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
}), actions)(CustomToolbar);
