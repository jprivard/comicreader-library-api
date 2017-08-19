let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    name: {
        type: String,
        Required: 'Name of the Book'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Books', BookSchema);
