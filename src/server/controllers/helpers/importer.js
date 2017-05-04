const CCTransaction = require('../../models/cc_transaction');
const ObjectId = require('mongodb').ObjectId;
const { AMEX, CITI } = require('../../constants/credit_cards');
const Categories = require('../../constants/categories');
const async = require('async');
const csv = require('csv');

const baseOptions = {
    trim: true,
    auto_parse_date: true,
    auto_parse: true,
    skip_empty_lines: true,
    relax: false
};

const description2category = (description) => {

};

const parseFloatIgnoreCommas = (number) => {
    if (typeof number === 'string') {
        return parseFloat(number.replace(/,/g, ''));
    }
    return number;
};

const mappers = {
    [CITI]: {
        inserter: (row) => {
            let credit = row['Credit'] || 0;
            let debit = row['Debit'] || 0;
            let amount = parseFloatIgnoreCommas(debit) - parseFloatIgnoreCommas(credit);
            let data = {
                date: row['Date'],
                amount,
                description: row['Description'].trim(),
                creditCardType: CITI
            };
            return data;
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
                description: row['Description'].trim(),
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
            if (err && err.code == 11000) {
                // transaction was already inserted, skip
                return cb(null, transaction);
            }

            if (err) {
                console.error(err);
                return cb(err)
            }
            return cb(null, transaction);
        });
    });

    async.parallel(transactionSaveTasks, callback);
};

module.exports = (creditCardType, callback) => {
    const options = mappers[creditCardType].options;

    const csv = require('csv');

    return csv.parse(options, function(err, data){
        if (err) {
            console.error(err);
            return callback(err);
        }
        dbInserter(creditCardType, data, callback);
    });
};
