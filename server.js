const express = require('express');
const bodyParser = require('body-parser');

const morgan  = require('morgan');

var swagger = require('swagger-express');

const app = express();

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    apis: ['./src/routes/reports.js', './src/routes/users.js', './src/routes/comments.js'],
    middleware: function(req, res){}
  }));

let reports = require('./src/routes/reports');
let users = require('./src/routes/users');
let comments = require('./src/routes/comments');

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

//app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use('/reports', reports);
app.use('/users', users);
app.use('/comments', comments);

module.exports = app