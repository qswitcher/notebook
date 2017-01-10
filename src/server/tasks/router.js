import Express from 'express';
import { MongoClient } from 'mongodb';
const router = Express.Router();


router.get('/', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/homepage', (err, db) => {
        if (err) throw err;

        db.collection('tasks').find().toArray((err, result) => {
            if (err) throw err;

            res.json(result);
        });
    });
});

export default router;
