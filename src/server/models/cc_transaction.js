const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { AMEX, CITI, DISCOVER, AMAZON, MARRIOTT } = require('../constants/credit_cards');

const ccTransactionSchema = new Schema({
    date: { type: Date, default: Date.now },
    amount: Number,
    description: String,
    creditCardType: {
        type: String,
        enum: [AMEX, CITI, DISCOVER, AMAZON, MARRIOTT]
    }
});

const CCTransactionClass = mongoose.model('ccTransaction', ccTransactionSchema);

module.exports = CCTransactionClass;
