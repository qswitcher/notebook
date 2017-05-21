import React from 'react';
import Categories from '../../../../../../server/constants/categories';
import RaisedButton from 'material-ui/RaisedButton';
import COLORS from '../../../../shared/colors';

const CategoryBreakdown = ({statistics}) => (
    <div>
        {Object.keys(Categories).filter(c => statistics[c] > 0).map((c, i) =>
            <RaisedButton 
                key={i} 
                label={`\$${parseInt(statistics[c], 10)} ${Categories[c]}`} 
                labelColor={'#FFFFFF'}
                backgroundColor={COLORS[i % COLORS.length]} 
                style={{width: 'calc(33% - 20px)', 
                margin: '10px'}}/>
        )}
    </div>
);

export default CategoryBreakdown;