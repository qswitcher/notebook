const CategoryMapping = require('../models/category_mapping');

module.exports.create = (req, res) => {
    const mapping = new CategoryMapping(req.body)
        .save((error) => {
            if (error) {
                res.status(400).send(error);
                return;
            }
            res.json(mapping);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
