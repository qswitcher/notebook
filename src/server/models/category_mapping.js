const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Categories = require('../constants/categories');

const categoryMappingSchema = new Schema({
    value: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: String,
        enum: Object.keys(Categories).map(key => Categories[key]),
        required: true
    }
});

categoryMappingSchema.pre('save', function(next) {
    const CCTransaction = mongoose.model('ccTransaction');

    CCTransaction.update({description: this.value}, {category: this.category})
        .then(() => {
            next();
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

const CategoryMappingClass = mongoose.model('categoryMapping', categoryMappingSchema);

module.exports = CategoryMappingClass;
