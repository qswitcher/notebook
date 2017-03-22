import Express from 'express';
const router = Express.Router();
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export default (db) => {
    router.get('/', (req, res) => {
        const today = new Date();
        const year = req.params.currentYear || today.getFullYear();
        const month = req.params.currentMonth || today.getMonth() + 1;

        db.collection('transactions').find().sort('date', -1).toArray((err, result) => {
            if (err) throw err;

            res.json(result.map((item) => {
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
                }
            }));
        });
    });

    router.post('/', (req, res) => {
        const transaction = req.body;
        db.collection('transactions').insertOne({
            ...transaction,
            date: Date.parse(transaction.date)
        });
        res.json(req.body);
    });

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        db.collection('transactions').deleteOne({'_id': ObjectId(id)});
        res.json({id});
    });

    router.post('/delete', (req, res) => {
        const ids = req.body;
        console.log(ids);
        db.collection('transactions').deleteMany({
            '_id': { $in: ids.map((id) => ObjectId(id))}
        });
        res.end('success');
    });

    router.post('/import', (req, res) => {
        let form = new formidable.IncomingForm();

        const readline = require('readline');
        const async = require('async');
        const csv = require('csv');

        form.parse(req, function(err, fields, files) {
            let tasks = Object.keys(files).map((key) => {
                return (callback) => {
                    const file = files[key];
                    const options = {
                        columns: true,
                        trim: true,
                        auto_parse_date: true,
                        auto_parse: true,
                        skip_empty_lines: true
                    };
                    let parser = csv.parse(options, function(err, data){
                        if (err) {
                            console.error(err);
                            return callback(err);
                        }

                        // send to DB
                        const transactions = data.map((row) => {
                            let credit = row['Credit'] || '0';
                            let debit = row['Debit'] || '0';
                            let amount = credit - debit;
                            return {
                                date: row['Date'],
                                amount,
                                description: row['Description']
                            }
                        });

                        db.collection('transactions').insertMany(transactions);
                        return callback(null, transactions);
                    });

                    fs.createReadStream(file.path).pipe(parser);
                };
            });

            async.parallel(tasks, function(err, results) {
                res.end('success');
            });
        });
    });
    return router;
};
