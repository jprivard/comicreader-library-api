let sinon = require('sinon');
let Route = require('../../../../library-api/api/routes/bookListRoute');
let Controller = require('../../../../library-api/api/controllers/bookListController');
let ControllerInspector = require('../../../lib/controllerInspector');

describe('Book List Route', () => {
    let app = null;
    let appMock = null;
    let controller = null;
    let controllerInspector = null;

    beforeEach(() => {
        app = {use: () =>{}, route: ()=>{}, get: ()=>{}, post: ()=>{}, put: ()=> {}, update: ()=>{}, delete: ()=>{}};
        controllerInspector = new ControllerInspector();
        controller = new Controller(controllerInspector.mongooseApi);
        appMock = sinon.mock(app);
        route = new Route(app, controller);
    });

    afterEach(() => {
        appMock.verify();
    });

    describe('setupRoutes function', () => {
        it('should inform express of all the necessary routes', () => {
            appMock.expects('route').twice().returns(app);
            appMock.expects('get').twice().withArgs(sinon.match.func).returns(app);
            appMock.expects('post').once().withArgs(sinon.match.func).returns(app);
            appMock.expects('put').once().withArgs(sinon.match.func).returns(app);
            appMock.expects('delete').once().withArgs(sinon.match.func).returns(app);

            route.setupRoutes();
        });
    });
});
