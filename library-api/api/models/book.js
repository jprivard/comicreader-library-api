let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let BookSchema = new Schema({
    name: {
        type: String,
    },
    author: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    }
});

let BookSerializer = new JSONAPISerializer('books', {
    attributes: ['name', 'author', 'thumbnail', 'description']
});

module.exports = { model: mongoose.model('Books', BookSchema), serializer: BookSerializer };
