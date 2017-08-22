class Controller {
    constructor(book, serializer) {
        this.book = book;
        this.serializer = serializer;
    }

    list(req, res) {
        this.display(res, () => {
            return this.book.find({}).select('name').exec().then(this.serialize.bind(this));
        });
    }

    create(req, res) {
        this.display(res, () => {
            return this.book.create(req.body).then(this.serialize.bind(this));
        });
    }

    read(req, res) {
        this.display(res, () => {
            return this.book.findOne({_id: req.params.bookId}).exec().then(this.serialize.bind(this));
        });
    }

    update(req, res) {
        this.display(res, () => {
            return this.book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}).exec().then(this.serialize.bind(this));
        });
    }

    delete(req, res) {
        this.display(res, () => {
            return this.book.remove({_id: req.params.bookId}).exec()
                .then(() => { return {message: 'Book successfully deleted'}; });
        });
    }

    serialize(data) {
        return this.serializer.serialize(data);
    }

    async display(res, func) {
        try {
            res.json(await func());
        } catch (e) {
            res.json({error: e.message});
        }
    }
}

module.exports = Controller;
