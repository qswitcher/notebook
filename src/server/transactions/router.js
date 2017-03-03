import Express from 'express';
const router = Express.Router();
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export default (db) => {
    router.get('/', (req, res) => {
        db.collection('transactions').find().toArray((err, result) => {
            if (err) throw err;

            res.json(result);
        });
    });

    router.post('/', (req, res) => {
        const transaction = req.body;
        db.collection('transactions').insertOne(transaction);
        res.json(req.body);
    });

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        db.collection('transactions').deleteOne({'_id': ObjectId(id)});
        res.json({id});
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
                            let date = row['Date'];
                            let credit = row['Credit'] || '0';
                            let debit = row['Debit'] || '0';
                            let amount = credit - debit;
                            return {
                                date: date.toISOString().substring(0, 10),
                                amount: amount,
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
                console.log('Imported=' + results);
                res.end('success');
            });
        });
    });
    return router;
};
