let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let BookSchema = new Schema({
    name: {
        type: String,
        Required: 'Name of the Book'
    },
    author: {
        type: String,
    },
    thumbnail: {
        type: String,
        default: ''
    }
});

let BookSerializer = new JSONAPISerializer('books', {
    attributes: ['name', 'author', 'thumbnail']
});

module.exports = { model: mongoose.model('Books', BookSchema), serializer: BookSerializer };
