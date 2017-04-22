import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class SpendingChart extends React.Component {
    componentWillMount() {
        const { currentYear, fetchStatistics } = this.props;
        fetchStatistics({
            currentYear
        });
    }

    render() {
        const { statistics } = this.props;
        if (statistics && statistics.length) {
          	return (
                <BarChart width={1200} height={400} data={statistics}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="amex" stackId="a" fill="#396AB1" />
                    <Bar dataKey="amazon" stackId="a" fill="#DA7C30" />
                    <Bar dataKey="citi" stackId="a" fill="#3E9651" />
                    <Bar dataKey="discover" stackId="a" fill="#CC2529" />
                    <Bar dataKey="marriott" stackId="a" fill="#535154" />
                </BarChart>
            );
        } else {
            return <div/>
        }
    }
}

export default connect(state => ({
    statistics: state.transactions.statistics,
    currentYear: state.transactions.currentYear
}), actions)(SpendingChart);
