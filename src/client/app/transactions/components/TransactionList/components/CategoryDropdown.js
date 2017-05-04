import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Categories from '../../../../../../server/constants/categories';

const underlineStyle = {
    borderTop: 'none'
};

class CategoryDropdown extends React.Component {
    handleChange(event, key, value) {
        this.props.onChange(value);
    }

    render() {
        return (
            <DropDownMenu underlineStyle={underlineStyle} value={this.props.value} onClick={(e) => e.stopPropagation()} onChange={this.handleChange.bind(this)}>
            {Object.values(Categories).map((category, i) => {
                return (
                    <MenuItem key={i} value={category} primaryText={category} className='category-dropdown-choice'/>
                )
            })}
            </DropDownMenu>
        );
    }
}

export default CategoryDropdown;
