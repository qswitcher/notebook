import mongoose, { Schema } from 'mongoose';
import { AMEX, CITI, DISCOVER, AMAZON, MARRIOTT } from '../constants/credit_cards';

const ccTransactionSchema = new Schema({
    date: { type: Date, default: Date.now, index: true },
    amount: Number,
    description: String,
    creditCardType: {
        type: String,
        enum: [AMEX, CITI, DISCOVER, AMAZON, MARRIOTT],
        index: true }
});

const CCTransactionClass = mongoose.model('ccTransaction', ccTransactionSchema);
export default CCTransactionClass;
