/* global describe, it, before */

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const validator = require('validator');
const schema = require('./schemas/developer.json');

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const expect = chai.expect;
const request = chai.request('http://localhost:3000');

before(() => {
  chai.tv4.addSchema('DeveloperSchema', schema);
  chai.tv4.addSchema('DevelopersSchema', {
    type: 'array',
    items: {
      $ref: 'DeveloperSchema'
    }
  });
});

describe('Developer CRUD', () => {
  it('POST /developers', done => {
    request
      .post('/developers')
      .send({
        firstName: 'Dev',
        lastName: 'Ni',
        experience: 2,
        photo: '',
        sex: 'male',
        email: 'lim@gmai.com',
        phone: 342452512,
        birth: '1996-04-23',
        timeZone: 2,
        country: 'Uk',
        skills: '[]'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('DeveloperSchema'));
        expect(validator.isEmail(res.body.email)).to.be.true;
        expect(validator.isDate(res.body.birth)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.birth).getTime() < Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('GET /developers', done => {
    request
      .get('/developers')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('DevelopersSchema'));
        done();
      });
  });

  it('GET /developers/:id', done => {
    request
      .get('/developers/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('DeveloperSchema'));
        expect(validator.isEmail(res.body.email)).to.be.true;
        expect(validator.isDate(res.body.birth)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.birth).getTime() < Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('GET /developer/ with wrong id', done => {
    request
      .get('/developers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });


  it('PUT /developers/id', done => {
    request
      .put('/developers/1')
      .send({
        country: 'Ukrr'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('DeveloperSchema'));
        expect(validator.isEmail(res.body.email)).to.be.true;
        expect(validator.isDate(res.body.birth)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.birth).getTime() < Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= Date.now()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('PUT /developers/wrongId', done => {
    request
      .put('/developers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });

  it('DELETE /developers/id', done => {
    request
      .delete('/developers/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('DELETE /developers/wrongId', done => {
    request
      .delete('/developers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
