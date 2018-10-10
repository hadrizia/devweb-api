const app = require('../src/index');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Para o teste funcionar, deve-se criar um usuário e fazer o login preenchendo os campos aqui.

describe('Teste POST /comments', () => {
    before(function(done) {
        request(app)
        .post('/auth/login')
        .send({ email: 'hadrielle@gmail.com', password: 'a123'})
        .end(function(err, res) {
            token = res.body.token;
            done();
        });
    });

   it('Deve retornar um novo comentário criado corretamente.', () => {
       let comment =  {
        "isAnonymous": false,
        "reportId": "5bbd4b849057293f4b04d0cf",
        "userId": "5bbd412f7a22d42f1805a4ae",
        "content": "String",
        "createdDate": "2018-10-10T01:06:27.507Z"
   }
        request(app)
        .post('/comments')
        .set('Authorization', 'Bearer ' + token)
        .send(comment)
        .end((err, res) => {
            expect('Content-Type', /json/);
            expect(res.statusCode).to.be.equal(201);
            expect(res.body.isAnonymous).to.be.equal(comment.isAnonymous);
            expect(res.body.content).to.be.equal(comment.content);
            expect(res.body.createdDate).to.be.equal(comment.createdDate);
            expect(res.body.userId).to.be.equal(comment.userId);
            expect(res.body.reportId).to.be.equal(comment.reportId);
        });
    });
});