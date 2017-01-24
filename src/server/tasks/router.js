import Express from 'express';
const router = Express.Router();

export default (db) => {
    router.get('/', (req, res) => {
        db.collection('tasks').find().toArray((err, result) => {
            if (err) throw err;

            res.json(result);
        });
    });

    router.post('/', (req, res) => {
        console.log(req.body);
        db.collection('tasks').insertOne(req.body);
        res.json(req.body);
    });

    return router;
};
