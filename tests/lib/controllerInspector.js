let sinon = require('sinon');

class ControllerInspector {

    constructor () {
        this.mongooseApi = { find:()=>{}, create:()=>{}, select:()=>{}, findOne:()=>{}, findOneAndUpdate:()=>{}, remove:()=>{}, exec:()=>{} };
        this.expressApi = { json:()=>{} };
        this.mongooseMock = sinon.mock(this.mongooseApi);
        this.expressMock = sinon.mock(this.expressApi);
    }

    verify () {
        this.mongooseMock.verify();
        this.expressMock.verify();
    }

    expectsMethodWithArgs (method, ...args) {
        return this.expects(this.mongooseMock, method, args, this.mongooseApi)
    }

    expectsResolvingMethodWithArgs (method, args, result) {
        return this.expects(this.mongooseMock, method, args, new Promise((res, rej) => res(result)))
    }

    expectsRejectingMethodWithArgs (method, args, result) {
        return this.expects(this.mongooseMock, method, args, new Promise((res, rej) => rej(result)))
    }

    expectsResolvingWith (result) {
        return this.expects(this.mongooseMock, 'exec', null, new Promise((res, rej) => res(result)))
    }

    expectsRejectingWith (result) {
        return this.expects(this.mongooseMock, 'exec', null, new Promise((res, rej) => rej(result)))
    }

    expectsOutputContaining (content) {
        return this.expects(this.expressMock, 'json', null, content);
    }

    expects (obj, method, args, result) {
        let expectation = obj.expects(method).once();
        if (!!args) expectation.withArgs.apply(expectation, args);
        if (!!result) expectation.returns(result);
        return this;
    }

}

module.exports = ControllerInspector;
