let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    name: {
        type: String,
        Required: 'Name of the Book'
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
    thumbnail: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Books', BookSchema);
