const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const swagger = require('swagger-express');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT || 8000;

var cache = require('memory-cache');
var mongoose = require ('mongoose');


let reports = require('./reports/reports.route');
let users = require('./users/users.route');
let comments = require('./comments/comments.route');
let auth = require('./auth/auth.route');

// Iniciando servidor
const app = express();

// Conectando ao banco de dados mongo
mongoose.connect('mongodb://localhost/devweb', { useNewUrlParser: true });

// Criando nova instância de Cache
var newCache = new cache.Cache();
newCache.put('foo', 'newbaz');
setTimeout(function() {
  console.log('foo in new cache is ' + newCache.get('foo'));
}, 200);

// Configurando CORS
var corsOptions = require('../config/cors');
if (process.env.NODE_ENV == 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

// Configurando documentação 
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

// Configurando o morgan
app.use(morgan('combined'));

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

// Utilizando variáveis de ambiente
if (process.env.NODE_ENV !== 'production') {
  console.log('dev enviroment detected!');
}

app.listen(PORT, () => console.log('Example app listening on port '+ PORT + '!'));

// Definindo rotas
app.use('/reports', reports);
app.use('/users', users);
app.use('/comments', comments);
app.use('/auth', auth);

module.exports = app;