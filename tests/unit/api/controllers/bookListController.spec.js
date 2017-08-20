const Controller = require('../../../../library-api/api/controllers/bookListController');
const ControllerInspector = require('../../../lib/controllerInspector');

describe('Book List Controller', () => {
    let controller = null;
    let controllerInspector = null;

    beforeEach(() => {
        controllerInspector = new ControllerInspector();
        controller = new Controller(controllerInspector.mongooseApi);
    });

    afterEach(() => {
        controllerInspector.verify();
    });

    describe('list function', () => {
        it('should fetch basic book details of entire library and display it', () => {
            controllerInspector
                .expectsMethodWithArgs('find', {})
                .expectsMethodWithArgs('select', 'name')
                .expectsResolvingWith([])
                .expectsOutputContaining([]);

            controller.list({}, controllerInspector.expressApi);
        });

        it('should display any error message received from mongoose', () => {
            controllerInspector
                .expectsMethodWithArgs('find', {})
                .expectsMethodWithArgs('select', 'name')
                .expectsRejectingWith('ApplicationError')
                .expectsOutputContaining({error: 'ApplicationError'});

            controller.list({}, controllerInspector.expressApi);
        });
    });

    describe('create function', () => {
        it('should create a new book and display it', () => {
            req = {body: {name: 'Destination Moon'}};
            controllerInspector
                .expectsResolvingMethodWithArgs('create', req.body, req.body)
                .expectsOutputContaining(req.body);

            controller.create(req, controllerInspector.expressApi);
        });

        it('should display any error message received from mongoose', () => {
            req = {body: {name: 'Destination Moon'}};
            controllerInspector
                .expectsRejectingMethodWithArgs('create', req.body, 'ApplicationError')
                .expectsOutputContaining({error: 'ApplicationError'});

            controller.create(req, controllerInspector.expressApi);
        });
    });

    describe('read function', () => {
        it('should fetch and display the details of a book', () => {
            req = {params: {bookId: '2ac3def'}};
            controllerInspector
                .expectsMethodWithArgs('findOne', {_id: '2ac3def'})
                .expectsResolvingWith({name: 'Destination Moon'})
                .expectsOutputContaining({name: 'Destination Moon'});

            controller.read(req, controllerInspector.expressApi);
        });

        it('should display any error message received from mongoose', () => {
            req = {params: {bookId: '2ac3def'}};
            controllerInspector
                .expectsMethodWithArgs('findOne', {_id: '2ac3def'})
                .expectsRejectingWith('ApplicationError')
                .expectsOutputContaining({error: 'ApplicationError'});

            controller.read(req, controllerInspector.expressApi);
        });
    });

    describe('update function', () => {
        it('should update a book and display the new object', () => {
            req = {params: {bookId: '2ac3def'}, body: {name: 'Destination Mars'}};
            controllerInspector
                .expectsMethodWithArgs('findOneAndUpdate', {_id: '2ac3def'}, req.body, {new: true})
                .expectsResolvingWith(req.body)
                .expectsOutputContaining(req.body);

            controller.update(req, controllerInspector.expressApi);
        });

        it('should display any error message received from mongoose', () => {
            req = {params: {bookId: '2ac3def'}, body: {name: 'Destination Mars'}};
            controllerInspector
                .expectsMethodWithArgs('findOneAndUpdate', {_id: '2ac3def'}, req.body, {new: true})
                .expectsRejectingWith('ApplicationError')
                .expectsOutputContaining({error: 'ApplicationError'});

            controller.update(req, controllerInspector.expressApi);
        });
    });

    describe('delete function', () => {
        it('should remove the book and displays a success message', () => {
            req = {params: {bookId: '2ac3def'}};
            controllerInspector
                .expectsMethodWithArgs('remove', {_id: '2ac3def'})
                .expectsResolvingWith('Worked!')
                .expectsOutputContaining({message: 'Book successfully deleted'});

            controller.delete(req, controllerInspector.expressApi);
        });

        it('should display any error message received from mongoose', () => {
            req = {params: {bookId: '2ac3def'}};
            controllerInspector
                .expectsMethodWithArgs('remove', {_id: '2ac3def'})
                .expectsRejectingWith('ApplicationError')
                .expectsOutputContaining({error: 'ApplicationError'});

            controller.delete(req, controllerInspector.expressApi);
        });
    });
});
