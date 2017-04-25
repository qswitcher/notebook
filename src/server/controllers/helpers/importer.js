const CCTransaction = require('../../models/cc_transaction');
const ObjectId = require('mongodb').ObjectId;
const { AMEX, CITI } = require('../../constants/credit_cards');
const async = require('async');
const csv = require('csv');

const baseOptions = {
    trim: true,
    auto_parse_date: true,
    auto_parse: true,
    skip_empty_lines: true,
    relax: true
};

const mappers = {
    [CITI]: {
        inserter: (row) => {
            let credit = row['Credit'] || '0';
            let debit = row['Debit'] || '0';
            let amount = debit - credit;
            return {
                date: row['Date'],
                amount,
                description: row['Description'],
                creditCardType: CITI
            };
        },
        options: Object.assign({}, baseOptions, {
            columns: true
        })
    },
    [AMEX]: {
        inserter: (row) => {
            let date = Date.parse(row['Date'].split(/\s+/)[0]);
            return {
                date,
                amount: row['Amount'],
                description: row['Description'],
                creditCardType: AMEX
            };
        },
        options: Object.assign({}, baseOptions, {
            columns: ['Date', '_', 'Description', 'User', 'Card', '_', '_', 'Amount', '_', '_', '_', '_', '_', '_', '_', '_']
        })
    }
};

const dbInserter = (creditCardType, data, callback) => {
    // send to DB
    const transactionSaveTasks = data.map((row) => (cb) => {
        const transaction = new CCTransaction(mappers[creditCardType].inserter(row));
        transaction.save((err) => {
            if (err) { return cb(err) }
            return cb(null, transaction);
        });
    });

    async.parallel(transactionSaveTasks, callback);
};

module.exports = (creditCardType, callback) => {
    const options = mappers[creditCardType].options;

    return csv.parse(options, function(err, data){
        if (err) {
            console.error(err);
            return callback(err);
        }
        dbInserter(creditCardType, data, callback);
    });
};
