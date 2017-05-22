import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import React from 'react'
import { computeStatistics } from '../../../helpers'
import CategoryBreakdown from './CategoryBreakdown';
import COLORS from '../../../../shared/colors';

const renderActiveShape = ({outerRadius, ...props}) => {
  return (
      <Sector
        {...props}
        outerRadius={outerRadius + 10}
      />
  );
};


class MonthSummary extends React.Component {
    constructor() {
        super();
        this.state = {activeIndex: -1};
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index
        });
    };

    render() {
       
        const statistics = computeStatistics(this.props.transactions);
        const data = Object.keys(statistics).filter(c => statistics[c] > 0).map(c => ({name: c, value: parseInt(statistics[c], 10)}));
        if (data && data.length > 0) {
          	return (
                <div style={{display: 'flex', minHeight: '250px'}}>
                    <div style={{flexGrow: '1'}}>
                        <CategoryBreakdown statistics={statistics} activeIndex={this.state.activeIndex} onHover={this.onPieEnter}/>
                    </div>
                    <PieChart onMouseEnter={this.onPieEnter}
                       
                        width={300}
                        height={200}>
                        <Pie 
                         activeIndex={this.state.activeIndex}
                         isAnimationActive={false}
                        activeShape={renderActiveShape}
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