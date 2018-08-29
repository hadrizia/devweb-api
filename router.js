const express = require('express');
const app = express();

var reports = require('./routes/reports');
var users = require('./routes/users');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use('/reports', reports);
app.use('/users', users);