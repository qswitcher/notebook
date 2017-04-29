const mongoose = require('mongoose');
const CCTransaction = require('../src/server/models/cc_transaction');
const CategoryMapping = require('../src/server/models/category_mapping');

before(done => {
    mongoose.connect('mongodb://localhost/finances_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});


beforeEach(done => {
    const { cctransactions } = mongoose.connection.collections;
    cctransactions.drop()
        .then(() => CCTransaction.ensureIndexes())
        .then(() => CategoryMapping.ensureIndexes())
        .then(() => done())
        .catch((err) => {
            console.warn(err);
            done();
        });
})
