let mongoose = require('mongoose');
let Book = mongoose.model('Books');

exports.list_all_books = async function(req, res) {
    console.log("Listing all books");
    res.json(await Book.find({}).select('name').exec());
};

exports.create_a_book = async function(req, res) {
    console.log("Created a new book");
    res.json(await Book.create(req.body));
};

exports.read_a_book = async function(req, res) {
    console.log("Reading book " + req.params.bookId);
    res.json(await Book.findOne({_id: req.params.bookId}).exec());
};

exports.update_a_book = async function(req, res) {
    console.log("Updating book " + req.params.bookId);
    res.json(await Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}).exec());
};

exports.delete_a_book = async function(req, res) {
    console.log("Deleting book " + req.params.bookId);
    await Book.remove({_id: req.params.bookId}).exec();
    res.json({ message: 'Book successfully deleted' });
};
