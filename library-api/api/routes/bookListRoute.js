class Router {
    constructor(app, controller) {
        this.app = app;
        this.controller = controller;
    }

    setupRoutes() {
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
