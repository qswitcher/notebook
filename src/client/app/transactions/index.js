import React from 'react';


class FinanceApp extends React.Component {
    render() {
        return <div>
                {this.props.children}
            </div>
    }
}

export default FinanceApp;
