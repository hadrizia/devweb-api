const express = require('express');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const swagger = require('swagger-express');
var cache = require('memory-cache');
var mongoose = require ('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

let reports = require('./reports/reports.route');
let users = require('./users/users.route');
let comments = require('./comments/comments.route');
const PORT = process.env.PORT || 3000;

// create new cache instance
var newCache = new cache.Cache();
 
newCache.put('foo', 'newbaz');
 
setTimeout(function() {
  console.log('foo in new cache is ' + newCache.get('foo'));
}, 200);

// API documentation UI
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './doc/swagger/',
    apis: ['src/users/users.route.js']
  }));

// faz o parse de requisições com o corpo do tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('static'));

// faz o parse de requisições com o corpo do tipo application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

if (process.env.NODE_ENV !== 'production') {
    console.log('dev enviroment detected!');
  }

app.listen(PORT, () => console.log('Example app listening on port '+ PORT + '!'));

app.use('/reports', reports);
app.use('/users', users);
app.use('/comments', comments);

module.exports = app;