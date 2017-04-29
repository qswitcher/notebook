const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardTypes = require('../constants/credit_cards');
const Categories = require('../constants/categories');

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
        enum: Object.keys(CardTypes).map(key => CardTypes[key]),
        required: true
    },
    category: {
        type: String,
        enum: Object.keys(Categories).map(key => Categories[key])
    }
});

ccTransactionSchema.index({creditCardType: 1, date: 1, description: 1, amount: 1}, {unique: true});

ccTransactionSchema.pre('save', function(next) {
    const CategoryMapping = mongoose.model('categoryMapping');
    CategoryMapping.find({value: this.description })
        .then(mappings => {
            if (mappings && mappings.length > 1) {
                this.category = mappings[0].category;
                next();
                return;
            }
            next();
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

const CCTransactionClass = mongoose.model('ccTransaction', ccTransactionSchema);

module.exports = CCTransactionClass;
