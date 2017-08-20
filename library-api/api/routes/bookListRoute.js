'use strict';
module.exports = function(app) {
    let mongoose = require('mongoose');
    let Book = mongoose.model('Books');
    let Controller = require('../controllers/bookListController');
    let controller = new Controller(Book);

    app.route('/books')
        .get(controller.list.bind(controller))
        .post(controller.create.bind(controller));

    app.route('/books/:bookId')
        .get(controller.read.bind(controller))
        .put(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));
};
