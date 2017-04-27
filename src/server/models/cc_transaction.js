const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { AMEX, CITI, DISCOVER, AMAZON, MARRIOTT } = require('../constants/credit_cards');

const ccTransactionSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creditCardType: {
        type: String,
        enum: [AMEX, CITI, DISCOVER, AMAZON, MARRIOTT],
        required: true
    }
});

ccTransactionSchema.index({creditCardType: 1, date: 1, description: 1, amount: 1}, {unique: true});

const CCTransactionClass = mongoose.model('ccTransaction', ccTransactionSchema);

module.exports = CCTransactionClass;
