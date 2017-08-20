let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let Controller = require('./api/controllers/bookListController');
let Route = require('./api/routes/bookListRoute');
let Book = require('./api/models/book');

let app = express();
let port = process.env.PORT || 3000;

/* Setup Mongoose */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/librarydb');

/* Setup Express */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Setup Controllers */
let controller = new Controller(mongoose.model('Books'));

/* Setup Routes */
let route = new Route(app, controller);
route.setupRoutes();

/* Start Listening */
app.listen(port);
console.log('Library API server started on: ' + port);
