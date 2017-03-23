import Express from 'express';
const router = Express.Router();
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
const CCTransaction = require('../controllers/cc_transactions');

export default (db) => {
    router.get('/', CCTransaction.list);

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

    router.post('/delete', CCTransaction.deleteAll);
    router.post('/import', CCTransaction.importTransactions);
    return router;
};
