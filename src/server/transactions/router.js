const Express = require('express');
const router = Express.Router();
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const CCTransaction = require('../controllers/cc_transactions');

router.get('/', CCTransaction.list);
router.get('/statistics', CCTransaction.statistics);

// router.post('/', (req, res) => {
//     const transaction = req.body;
//     db.collection('transactions').insertOne({
//         ...transaction,
//         date: Date.parse(transaction.date)
//     });
//     res.json(req.body);
// });
//
// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     db.collection('transactions').deleteOne({'_id': ObjectId(id)});
//     res.json({id});
// });

router.post('/delete', CCTransaction.deleteAll);
router.post('/import', CCTransaction.importTransactions);

module.exports = router;
