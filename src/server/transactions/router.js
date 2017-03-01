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
        // form.multiples = true;
        // form.uploadDir = path.join(__dirname, '/../uploads');

        // form.on('file', function(field, file) {
        //     fs.rename(file.path, path.join(form.uploadDir, file.name));
        // });
        // form.on('error', function(err) {
        //     console.log('An error has occured: \n' + err);
        // });
        // form.on('end', function(fields, files) {
        //     console.log(fields);
        //     res.end('success');
        // });

        const readline = require('readline');
        const async = require('async');

        // form.parse(req);
        form.parse(req, function(err, fields, files) {
            // console.log(fields);
            let tasks = Object.keys(files).map((key) => {
                return (callback) => {
                    const file = files[key];
                    const instream = fs.createReadStream(file.path);
                    const outstream = new (require('stream'))();
                    const rl = readline.createInterface(instream, outstream);

                    rl.on('line', function(line) {
                        console.log(`line=${line}`);
                    });

                    rl.on('close', function(line) {
                        callback(null);
                    });
                };
            });

            async.parallel(tasks, function(err, results) {
                console.log('done');
                res.end('success');
            });
        });
    });
    return router;
};
