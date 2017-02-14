import Express from 'express';
const router = Express.Router();
import { ObjectId } from 'mongodb';

export default (db) => {
    router.get('/', (req, res) => {
        db.collection('transactions').find().toArray((err, result) => {
            if (err) throw err;

            res.json(result);
        });
    });

    router.post('/', (req, res) => {
        db.collection('transactions').insertOne(req.body);
        res.json(req.body);
    });

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        db.collection('transactions').deleteOne({'_id': ObjectId(id)});
        res.json({id});
    })
    return router;
};
