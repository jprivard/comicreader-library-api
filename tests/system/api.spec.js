let proc = require('child_process');
let exec = proc.exec;
let asyncProc = require('async-child-process');
let join = asyncProc.join;
let rp = require('request-promise-native');
let expect = require('chai').expect;

describe('comicreader-library-api', function () {
    this.timeout(20000);
    let content = null;
    let options = null;
    let context = {};

    before(async () => {
        await join(exec(`docker network create test`));
        await join(exec(`docker run -p 27017:27017 --network test --name mongo -d mongo:3.4.7`));
        await join(exec(`docker run -p 80:3000 --network test --name api -d comicreader-library-api`));
        await new Promise(resolve => setTimeout(resolve, 3000));
    });

    after(async () => {
        await join(exec(`docker container rm -f api`));
        await join(exec(`docker container rm -f mongo`));
        await join(exec('docker network rm test'));
    });

    it('LIST no book on first attempt', async () => {
        content = JSON.parse(await rp('http://localhost/books/'));
        expect(content.data).to.be.an('array').that.is.empty;
    });

    it('CREATE a new book', async () => {
        options = {
            method: 'POST',
            uri: 'http://localhost/books/',
            form: {name: 'Destination Moon', thumbnail: 'img.jpg', author: 'Herge'},
        };
        content = JSON.parse(await rp(options));
        expect(content.data.attributes).to.have.deep.property('name', 'Destination Moon');
        context = {id: content.data.id};
    });

    it('GET a specific book', async () => {
        content = JSON.parse(await rp('http://localhost/books/'+context.id+'/'));
        expect(content.data.attributes).to.have.deep.property('name', 'Destination Moon');
    });

    it('UPDATE a specific book', async () => {
        options = {
            method: 'PUT',
            uri: 'http://localhost/books/'+context.id+'/',
            form: {name: 'Destination Mars'},
        };
        content = JSON.parse(await rp(options));
        expect(content.data.attributes).to.have.deep.property('name', 'Destination Mars');
        expect(content.data.attributes).to.have.deep.property('thumbnail', 'img.jpg');
        expect(content.data.attributes).to.have.deep.property('author', 'Herge');
    });

    it('LIST should display added book', async () => {
        content = JSON.parse(await rp('http://localhost/books/'));
        expect(content.data).to.be.an('array').that.is.not.empty;
    });

    it('DELETE a specific book', async () => {
        options = {
            method: 'DELETE',
            uri: 'http://localhost/books/'+context.id+'/'
        };
        content = JSON.parse(await rp(options));
        expect(content).to.have.deep.property('message', 'Book successfully deleted');
    });

    it('LIST should be back to display an empty list', async () => {
        content = JSON.parse(await rp('http://localhost/books/'));
        expect(content.data).to.be.an('array').that.is.empty;
    });
});
