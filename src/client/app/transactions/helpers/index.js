import Categories from '../../../../server/constants/categories';

export function computeStatistics(transactions) {
    const statistics = {};
    Object.keys(Categories).forEach(c => {
        statistics[c] = 0;
    });

    if (transactions) {
        transactions.forEach(t => {
            Object.keys(Categories)
                .filter(c => t.category === Categories[c])
                .forEach(c => statistics[c] += parseFloat(t.amount));
        });
    }
    return statistics;
};
