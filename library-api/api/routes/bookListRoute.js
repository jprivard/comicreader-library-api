class Router {
    constructor(app, controller) {
        this.app = app;
        this.controller = controller;
    }

    setupRoutes() {
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.route('/books')
            .get(this.controller.list.bind(this.controller))
            .post(this.controller.create.bind(this.controller));

        this.app.route('/books/:bookId')
            .get(this.controller.read.bind(this.controller))
            .put(this.controller.update.bind(this.controller))
            .delete(this.controller.delete.bind(this.controller));
    }
}

module.exports = Router;
