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

    describe('list', () => {
        it('should display fetch and display all the books', () => {
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

    describe('create', () => {
        it('should create a new book and display it', () => {
            req = {body: {name: 'Destination Moon'}};
            controllerInspector
                .expectsResolvingMethodWithArgs('create', req.body, 'Worked!')
                .expectsOutputContaining('Worked!');

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

});
