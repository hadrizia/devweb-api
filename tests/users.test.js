const app = require('../src/index');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Teste POST /users', () => {
   it('Deve retornar um novo usuário criado corretamente.', () => {
       let user = {
           'name': "Maju Doidinha",
           'username': "maju",
           'photoUrl': "String",
           'birth': "2018-08-06T03:00:00.000Z",
           'email': "maju@gmail.com",
           'gender': "F",
           'createdAt': "2018-10-09T22:56:11.477Z"
       };
       request(app)
       .post('/users')
        .send(user)
        .end((err, res) => {
            expect('Content-Type', /json/);
            expect(res.statusCode).to.be.equal(201);
            expect(res.body.name).to.be.equal(user.name);
            expect(res.body.username).to.be.equal(user.username);
            expect(res.body.photoUrl).to.be.equal(user.photoUrl);
            expect(res.body.birth).to.be.equal(user.birth);
            expect(res.body.email).to.be.equal(user.email);
            expect(res.body.gender).to.be.equal(user.gender);
            expect(res.body.createdAt).to.be.equal(user.createdAt);
        });
    });
});


describe('Teste GET /users/{userId}', () => {
  
    before(function(done) {
      request(app)
        .post('/auth/login')
        .send({ email: 'hadrielle@gmail.com', password: 'a123'})
        .end(function(err, res) {
            token = res.body.token;
            done();
        });
    });
  
    it('Deve retornar um usuário pelo seu id.', () => {
        let user = {
            "_id": "5bbd41507a22d42f1805a4af",
            "name": "Hadrielle Araújo",
            "username": "hadrielle",
            "photoUrl": "String",
            "birth": "1997-12-11T03:00:00.000Z",
            "email": "hadrielle@gmail.com",
            "gender": "F",
            "createdAt": "2018-10-10T00:01:20.689Z",
        };
        request(app)
        .get('/users/5bbd41507a22d42f1805a4af')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
           expect('Content-Type', /json/);
           expect(res.statusCode).to.be.equal(200)
           expect(res.body._id).to.be.equal(user._id)
           expect(res.body.name).to.be.equal(user.name)
           expect(res.body.username).to.be.equal(user.username)
           expect(res.body.photoUrl).to.be.equal(user.photoUrl)
           expect(res.body.birth).to.be.equal(user.birth)
           expect(res.body.email).to.be.equal(user.email)
           expect(res.body.gender).to.be.equal(user.gender)
           expect(res.body.createdAt).to.be.equal(user.createdAt);
        });
    });
}); 