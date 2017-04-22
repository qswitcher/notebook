const CCTransaction = require('../models/cc_transaction');
const fs = require('fs');
const async = require('async');
const path = require('path');
const formidable = require('formidable');
const ObjectId  =  require('mongodb').ObjectId;
const dbInserter = require('./helpers/importer').dbInserter;
const { CITI } = require('../constants/credit_cards');
const CardTypes = require('../constants/credit_cards');

function datetimeToDateString(date) {
    return new Date(date).toISOString().substring(0,10);
}

module.exports.statistics = (req, res, next) => {
    const year = (+req.query.year) || today.getFullYear();

    CCTransaction.find({
        date: { $gte: Date.parse(`${year}-01-01`) , $lt: Date.parse(`${year+1}-01-01`)}
    }).lean().exec((err, docs) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const statistics = [];
        for (let i = 0; i <12; i++) {
            statistics[i] = {
                sum: 0,
                date: `${year}-${(i + 1) < 10 ? '0' : ''}${i + 1}`
            };
            Object.keys(CardTypes).forEach(cardType => {
                statistics[i][cardType.toLowerCase()] = 0;
            });
        }

        docs.forEach((item) => {
            const date = datetimeToDateString(item.date);
            const month = +(date.split('-')[1]);
            statistics[month - 1].sum += -1*parseFloat(item.amount);
            statistics[month - 1][item.creditCardType.toLowerCase()] += -1*parseFloat(item.amount);
        });

        statistics.forEach((item) => {
            item.sum = item.sum.toFixed(2);
            Object.keys(CardTypes).forEach(cardType => {
                item[cardType.toLowerCase()] = item[cardType.toLowerCase()].toFixed(2);
            });
        });

        res.json(statistics);
    });
}

module.exports.list = (req, res, next) => {
    const today = new Date();
    const year = (+req.query.year) || today.getFullYear();
    const month = (+req.query.month) || today.getMonth() + 1;
    CCTransaction.find({
        date: { $gte: Date.parse(`${year}-${month}-01`) , $lt: Date.parse(`${year}-${month % 12 + 1}-01`)}
    }).sort('-date').lean().exec((err, docs) => {
        if (err) throw err;

        res.json(docs.map((item) => {
            const date = item.date;
            return Object.assign({}, item, {
                date: new Date(date).toISOString().substring(0,10)
            });
        }));
    });
}

module.exports.importTransactions = (req, res, next) => {
    let form = new formidable.IncomingForm();

    const readline = require('readline');
    const async = require('async');
    const csv = require('csv');

    form.parse(req, function(err, fields, files) {
        const creditCardType = fields.creditCardType;
        if (!creditCardType) {
            return res.status(422).send({ error: 'You must provide a credit card type'});
        }

        let tasks = Object.keys(files).map((key) => {
            return (callback) => {
                const file = files[key];
                const options = {
                    columns: creditCardType === CITI,
                    trim: true,
                    auto_parse_date: true,
                    auto_parse: true,
                    skip_empty_lines: true,
                    relax: true
                };

                let parser = csv.parse(options, function(err, data){
                    if (err) {
                        console.error(err);
                        return callback(err);
                    }
                    dbInserter(creditCardType, data, callback);
                });

                fs.createReadStream(file.path).pipe(parser);
            };
        });

        async.parallel(tasks, function(err, results) {
            res.end('success');
        });
    });
}

module.exports.deleteAll = (req, res) => {
   const ids = req.body;
   CCTransaction.remove({
       '_id': { $in: ids.map((id) => ObjectId(id))}
   }, (err) => {
       if (err) { return res.end('error'); }
       res.end('success');
   });
}
