const CCTransaction = require('../models/cc_transaction');
const fs = require('fs');
const async = require('async');
const path = require('path');
const formidable = require('formidable');
const ObjectId  =  require('mongodb').ObjectId;
const transactionImporter = require('./helpers/importer');
const CardTypes = require('../constants/credit_cards');
const Categories = require('../constants/categories');
const parseDate = require('../../client/app/shared/utils/date_utils').parseDate;

function datetimeToDateString(date) {
    return new Date(date).toISOString().substring(0,10);
}

function getKey(object, value) {
  return Object.keys(object).find(key => object[key] === value);
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
                date: `${year}-${(i + 1) < 10 ? '0' : ''}${i + 1}`,
                spending: {}
            };
            Object.keys(CardTypes).forEach(cardType => {
                statistics[i][cardType.toLowerCase()] = 0;
            });
            Object.keys(Categories).forEach(category => {
                statistics[i].spending[category.toLowerCase()] = 0;
            });
        }

        docs.forEach((item) => {
            const date = datetimeToDateString(item.date);
            const month = +(date.split('-')[1]);
            // want to skip auto payments for computing statistics since we pay off the balance
            // each month
            const notPayment = item.description.toLowerCase().indexOf('autopay') === -1 &&
                item.description.toLowerCase().indexOf('payment') === -1 &&
                item.description.toLowerCase().indexOf('cash reward') === -1;
            if (!item.description || notPayment) {
                statistics[month - 1].sum += parseFloat(item.amount);
                statistics[month - 1][item.creditCardType.toLowerCase()] += parseFloat(item.amount);
            }

            if (item.category && getKey(Categories, item.category)) {
                statistics[month - 1].spending[getKey(Categories, item.category).toLowerCase()] += parseFloat(item.amount);
            } else if (!item.category && notPayment) {
                statistics[month - 1].spending[getKey(Categories, Categories.UNASSIGNED).toLowerCase()] += parseFloat(item.amount);
            }
        });

        statistics.forEach((item) => {
            item.sum = item.sum.toFixed(2);
            Object.keys(CardTypes).forEach(cardType => {
                item[cardType.toLowerCase()] = item[cardType.toLowerCase()].toFixed(2);
            });
            Object.keys(Categories).forEach(category => {
                item.spending[category.toLowerCase()] = item.spending[category.toLowerCase()].toFixed(2);
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
                date: date.toISOString().substring(0,10)
            });
        }));
    });
}

module.exports.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    CCTransaction.findOne({_id: id})
        .then(t => {
            CCTransaction.update({description: t.description}, {category: body.category}, {multi: true})
                .then(() => {
                    return res.json({id})
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        })
        .catch(err => res.status(500).send(err));
};

module.exports.importTransactions = (req, res, next) => {
    let form = new formidable.IncomingForm();

    const readline = require('readline');
    const async = require('async');

    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.status(500).send(err);
        }
        const creditCardType = fields.creditCardType;
        if (!creditCardType) {
            return res.status(422).send({ error: 'You must provide a credit card type'});
        }

        let tasks = Object.keys(files).map((key) => (callback) => {
            let importer = transactionImporter(creditCardType, callback);
            fs.createReadStream(files[key].path).pipe(importer);
        });

        async.parallel(tasks, function(err, results) {
            if (err) {
                return res.status(500).send(err);
            }
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
