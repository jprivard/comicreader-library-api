class Controller {
    constructor(book) {
        this.book = book;
    }

    list(req, res) {
        this.display(res, () => {
            return this.book.find({}).select('name').exec();
        });
    }

    create(req, res) {
        this.display(res, () => {
            return this.book.create(req.body);
        });
    }

    read_a_book(req, res) {
        this.display(res, () => {
            return this.book.findOne({_id: req.params.bookId}).exec();
        });
    }

    async update_a_book(req, res) {
        this.display(res, () => {
            return this.book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}).exec();
        });
    }

    async delete_a_book(req, res) {
        this.display(res, () => {
            return this.book.remove({_id: req.params.bookId}).exec()
                .then(() => { return {message: 'Book successfully deleted'}; });
        });
    }

    async display(res, func) {
        try {
            res.json(await func());
        } catch (e) {
            res.json({error: e});
        }
    }
}

module.exports = Controller;
