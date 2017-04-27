import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'

const FlatButtonLink = ({to, children}) => {
    const navigate = (event) => {
        browserHistory.push(to);
    };

    return (
        <FlatButton onTouchTap={navigate}>
            {children}
        </FlatButton>
    )
};

export default FlatButtonLink;
