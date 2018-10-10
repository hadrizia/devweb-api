const app = require('../src/index');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Para o teste funcionar, deve-se criar um usuário e fazer o login preenchendo os campos aqui.

describe('Teste POST /reports', () => {
    before(function(done) {
        request(app)
        .post('/auth/login')
        .send({ email: 'hadrielle@gmail.com', password: 'a123'})
        .end(function(err, res) {
            token = res.body.token;
            done();
        });
    });

   it('Deve retornar um novo report criado corretamente.', () => {
       let report = {
        "isAnonymous": false,
        "title": "Title1",
        "content": "String",
        "userId": "5bbd412f7a22d42f1805a4ae",
        "createdDate": "2018-10-10T00:44:52.169Z"
        };
        request(app)
        .post('/reports')
        .set('Authorization', 'Bearer ' + token)
        .send(report)
        .end((err, res) => {
            expect('Content-Type', /json/);
            expect(res.statusCode).to.be.equal(201);
            expect(res.body.isAnonymous).to.be.equal(report.isAnonymous);
            expect(res.body.title).to.be.equal(report.title);
            expect(res.body.content).to.be.equal(report.content);
            expect(res.body.createdDate).to.be.equal(report.createdDate);
        });
    });
});