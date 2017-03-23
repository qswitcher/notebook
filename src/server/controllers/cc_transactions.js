import CCTransaction from '../models/cc_transaction';
import fs from 'fs';
import async from 'async';
import path from 'path';
import formidable from 'formidable';
import { ObjectId } from 'mongodb';
import { dbInserter } from './helpers/importer';

export function list(req, res, next) {
    const today = new Date();
    const year = req.query.currentYear || today.getFullYear();
    const month = (+req.query.currentMonth + 1) || today.getMonth() + 1;
    CCTransaction.find({
        date: { $gte: Date.parse(`${year}-${month}-01`) , $lt: Date.parse(`${year}-${month % 12 + 1}-01`)}
    }).sort('-date').lean().exec((err, docs) => {
        if (err) throw err;

        res.json(docs.map((item) => {
            const date = item.date;
            let formattedDate;
            // TODO delete all the string type dates
            if (typeof date === 'string') {
                formattedDate = date;
            } else {
                formattedDate = (new Date(date)).toISOString().substring(0,10);
            }
            return {
                ...item,
                date: formattedDate
            };
        }));
    });
}

export function importTransactions(req, res, next) {
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
                    coluns: true,
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

export function deleteAll(req, res) {
   const ids = req.body;
   CCTransaction.remove({
       '_id': { $in: ids.map((id) => ObjectId(id))}
   }, (err) => {
       if (err) { return res.end('error'); }
       res.end('success');
   });
}
