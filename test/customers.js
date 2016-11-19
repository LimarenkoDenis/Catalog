/* global describe, it, before */

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const validator = require('validator');
const schema = require('./schemas/customer.json');
// const app = require('./../app');

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const expect = chai.expect;
// const request = chai.request(app);
const request = chai.request('http://localhost:3000');

before(() => {
  chai.tv4.addSchema('CusomerSchema', schema);
  chai.tv4.addSchema('CusomersSchema', {
    type: 'array',
    items: {
      $ref: 'CusomerSchema'
    }
  });
});

describe('Customers CRUD', () => {
  it('POST /customers', done => {
    request
      .post('/customers')
      .send({
        firstName: 'Nfewredsdsdgan',
        lastName: 'Ni',
        photo: '',
        sex: 'male',
        email: 'edefff@gmai.com',
        phone: 342452512,
        birth: '1956-04-23',
        timeZone: -7,
        country: 'USA'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('CusomerSchema'));
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

  it('GET /customers', done => {
    request
      .get('/customers')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('CusomersSchema'));
        done();
      });
  });

  it('GET /customers/:id', done => {
    request
      .get('/customers/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('CusomerSchema'));
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

  it('GET /customers/ with wrong id', done => {
    request
      .get('/customers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });


  it('PUT /customers/id', done => {
    request
      .put('/customers/1')
      .send({
        country: 'Ukrr'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('CusomerSchema'));
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

  it('PUT /customers/wrongId', done => {
    request
      .put('/customers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });

  it('DELETE /customers/id', done => {
    request
      .delete('/customers/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('DELETE /customers/wrongId', done => {
    request
      .delete('/customers/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
