const mongoose = require('mongoose');

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
        .then(() => done())
        .catch((err) => {
            console.warn(err);
            done();
        });
})
