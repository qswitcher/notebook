import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import React from 'react'
import { computeStatistics } from '../../../helpers'
import CategoryBreakdown from './CategoryBreakdown';
import COLORS from '../../../../shared/colors';

class MonthSummary extends React.Component {
    render() {
       
        const statistics = computeStatistics(this.props.transactions);
        const data = Object.keys(statistics).map(c => ({name: c, value: parseInt(statistics[c], 10)}));
        if (data && data.length > 0) {
          	return (
                <div style={{display: 'flex', minHeight: '250px'}}>
                    <div style={{flexGrow: '1'}}>
                        <CategoryBreakdown statistics={statistics}/>
                    </div>
                    <PieChart
                        width={300}
                        height={200}>
                        <Pie
                        data={data} 
                        label={false}
                        fill="#8884d8"
                        >
                            {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                        </Pie>
                    </PieChart>
                </div>
            );
        } else {
            return <div/>
        }
    }
}

export default MonthSummary;