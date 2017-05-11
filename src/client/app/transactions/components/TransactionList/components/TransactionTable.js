import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toolbar from './Toolbar';
import CategoryDropdown from './CategoryDropdown';

class TransactionTable extends React.Component {
    render() {
        const {
            selected,
            transactions,
            location,
            handleSelected,
            handleUpdateCategory } = this.props;

        return (
            <div >
                <Toolbar {...location}/>
                <Table
                    selectable={true}
                    stripedRows={true}
                    multiSelectable={true}
                    onRowSelection={handleSelected}>
                    <TableHeader
                        adjustForCheckbox={true}
                        displaySelectAll={true}
                        enableSelectAll={true}>
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Category</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
                            <TableHeaderColumn>Amount</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                     displayRowCheckbox={true}
                     deselectOnClickaway={true}
                     showRowHover={true}>
                        {transactions.map((transaction, index) => {
                            return (<TableRow key={index} selected={transaction.selected}>
                                <TableRowColumn>{ transaction.date }</TableRowColumn>
                                <TableRowColumn>{ transaction.description }</TableRowColumn>
                                <TableRowColumn><CategoryDropdown value={transaction.category} onChange={(category) => handleUpdateCategory(category, transaction)}/></TableRowColumn>
                                <TableRowColumn>{ transaction.creditCardType }</TableRowColumn>
                                <TableRowColumn>{ transaction.amount }</TableRowColumn>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
};

export default TransactionTable;
