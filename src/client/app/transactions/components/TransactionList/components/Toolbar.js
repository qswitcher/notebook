import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import CreateForm from './CreateTransaction';
import CreditCardImport from './CreditCardImport';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import { browserHistory } from 'react-router'

class CustomToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      showImport: false
    };
  }

  handleCurrentMonthChange = (event, index, value) => {
    //   const { updateCurrentMonth } = this.props;
      browserHistory.push({
          pathname: this.props.pathname,
          query: {
              year: this.props.query.year,
              month: value + 1
          }
      });
    //   updateCurrentMonth(value);
  };

  handleCurrentYearChange = (event, index, value) => {
    //   const { updateCurrentYear } = this.props;
    //   updateCurrentYear(value);
    browserHistory.push({
        pathname: this.props.pathname,
        query: {
            year: value,
            month: this.props.query.month
        }
    });
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
      const { year, month } = this.props.query;
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
                <FontIcon className="material-icons">chevron_left</FontIcon>
                <DropDownMenu labelStyle={{lineHeight: '48px'}} value={parseInt(month, 10) - 1} onChange={this.handleCurrentMonthChange}>
                    {months.map((month, i) => {
                        return (
                            <MenuItem key={i} value={i} primaryText={month} />
                        )
                    })}
                 </DropDownMenu>
                 <FontIcon className="material-icons">chevron_right</FontIcon>
                 <FontIcon className="material-icons">chevron_left</FontIcon>
                 <DropDownMenu value={parseInt(year, 10)} onChange={this.handleCurrentYearChange}>
                     {years.map((year) => {
                         return (
                             <MenuItem key={year} value={year} primaryText={year} />
                         )
                     })}
                  </DropDownMenu>
                  <FontIcon className="material-icons">chevron_right</FontIcon>
            </ToolbarGroup>
            <ToolbarGroup>
                 <ToolbarSeparator />
                 <RaisedButton label="Delete Selected" secondary={true} onTouchTap={this.handleDelete} />
             </ToolbarGroup>
          </Toolbar>
      </div>
    );
  }
}

export default connect((state) => ({
    selected: state.transactions.selected
}), actions)(CustomToolbar);
