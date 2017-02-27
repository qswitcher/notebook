import Express from 'express';
const router = Express.Router();
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/../uploads');

        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });
        form.on('end', function() {
            res.end('success');
        });

        form.parse(req);
    });
    return router;
};
