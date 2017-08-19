'use strict';
module.exports = function(app) {
    let bookList = require('../controllers/bookListController');

    app.route('/books')
        .get(bookList.list_all_books)
        .post(bookList.create_a_book);

    app.route('/books/:bookId')
        .get(bookList.read_a_book)
        .put(bookList.update_a_book)
        .delete(bookList.delete_a_book);
};
