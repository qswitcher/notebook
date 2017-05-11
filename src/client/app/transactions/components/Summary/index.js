import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { dateOrToday } from '../../../shared/utils/date_utils';

class Summary extends React.Component {
    componentWillMount() {
        const date = dateOrToday(this.props.location.query);
        const { fetchStatistics } = this.props;
        fetchStatistics({
            year: date.year
        });
    }

    render() {
        const { statistics } = this.props;
        if (statistics && statistics.length) {
          	return (
                <div>
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
                    
                </div>
            );
        } else {
            return <div/>
        }
    }
}

export default connect(state => ({
    statistics: state.transactions.statistics,
    currentYear: state.transactions.currentYear
}), actions)(Summary);
