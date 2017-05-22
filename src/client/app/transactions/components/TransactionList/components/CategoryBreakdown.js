import React from 'react';
import Categories from '../../../../../../server/constants/categories';
import RaisedButton from 'material-ui/RaisedButton';
import COLORS from '../../../../shared/colors';

const amountLabelStyle = {
    width: '30%',
    display: 'inline-block',
    color: '#FFFFFF'
};

const categoryLabelStyle = {
    width: '70%',
    display: 'inline-block',
    textAlign: 'left',
    color: '#FFFFFF'
};

console.log(RaisedButton.propTypes);
const CategoryBreakdown = ({statistics, onHover}) => (
    <div>
        {Object.keys(Categories).filter(c => statistics[c] > 0).map((c, i) =>
            <RaisedButton 
                onMouseEnter={() => onHover(c, i)}
                onMouseLeave={() => onHover(c, -1)}
                key={i} 
                backgroundColor={COLORS[i % COLORS.length]} 
                style={{width: 'calc(33% - 20px)', 
                margin: '10px'}}>
                <div style={amountLabelStyle}>$ {parseInt(statistics[c], 10)}</div>
                <div style={categoryLabelStyle}>{Categories[c]}</div>
            </RaisedButton>
        )}
    </div>
);

export default CategoryBreakdown;