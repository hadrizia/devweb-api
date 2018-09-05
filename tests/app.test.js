const request = require('supertest');
const express = require('express');
 
const app = require('../server');
 
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});
 
request(app)
  .get('/users')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '107')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

