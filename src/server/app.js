const path = require('path');
const Express = require('express');
const transactions = require('./transactions/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/finaces');
}

const app = new Express();

// const indexPath = path.join(__dirname, '../../dist/index.html');
// const publicPath = Express.static(path.join(__dirname, '../../dist'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(bodyParser.json());

// endpoints
app.use('/api/transactions', transactions);

// app.use('/dist', publicPath);

// app.get('/', function (_, res) { res.sendFile(indexPath) });

module.exports = app;
