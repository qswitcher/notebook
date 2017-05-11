import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { dateOrToday } from '../../../shared/utils/date_utils';
import Categories from '.../../../../server/constants/categories';

class Summary extends React.Component {
    componentWillMount() {
        const date = dateOrToday(this.props.location.query);
        const { fetchStatistics } = this.props;
        fetchStatistics({
            year: date.year
        });
    }

    render() {
        const colors = [
            '#278ECF',
            '#4BD762',
            '#FFCA1F',
            '#FF9416',
            '#D42AE8',
            '#535AD7',
            '#FF402C',
            '#83BFFF',
            '#6EDB8F',
            '#FFE366'
        ];
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
                    <BarChart width={1200} height={400} data={statistics}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        {Object.keys(Categories).map((category, index) => {
                            const dataKey = `spending.${category.toLowerCase()}`;
                            return (<Bar key={dataKey} dataKey={dataKey} name={Categories[category]} stackId="a" fill={colors[index % colors.length]} />);
                        })}
                    </BarChart>);
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
