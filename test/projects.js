/* global describe, it, before */

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const validator = require('validator');
const schema = require('./schemas/project.json');

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const expect = chai.expect;
const request = chai.request('http://localhost:3000');

before(() => {
  chai.tv4.addSchema('ProjectSchema', schema);
  chai.tv4.addSchema('ProjectsSchema', {
    type: 'array',
    items: {
      $ref: 'ProjectSchema'
    }
  });
});

describe('Project CRUD', () => {
  it('POST /projects', done => {
    request
      .post('/projects')
      .send({
        title: 'project',
        description: 'lorem ipson',
        status: 'active',
        price: 12.2,
        version: 1.1,
        start: '2015-04-23',
        deadline: '2017-04-23',
        progress: 95
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('ProjectSchema'));
        expect(validator.isDate(res.body.deadline)).to.be.true;
        expect(validator.isDate(res.body.start)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.start).getTime() <= new Date(res.body.deadline).getTime()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('GET /projects', done => {
    request
      .get('/projects')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('ProjectsSchema'));
        done();
      });
  });

  it('GET /projects/:id', done => {
    request
      .get('/projects/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('ProjectSchema'));
        expect(validator.isDate(res.body.deadline)).to.be.true;
        expect(validator.isDate(res.body.start)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.start).getTime() <= new Date(res.body.deadline).getTime()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('GET /project/ with wrong id', done => {
    request
      .get('/projects/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });


  it('PUT /projects/id', done => {
    // price format
    request
      .put('/projects/1')
      .send({
        description: 'update put',
        price: '11.2'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(chai.tv4.getSchema('ProjectSchema'));
        expect(validator.isDate(res.body.deadline)).to.be.true;
        expect(validator.isDate(res.body.start)).to.be.true;
        expect(validator.isDate(res.body.createdAt)).to.be.true;
        expect(validator.isDate(res.body.updatedAt)).to.be.true;
        expect(new Date(res.body.start).getTime() <= new Date(res.body.deadline).getTime()).to.be.true;
        expect(new Date(res.body.createdAt).getTime() <= new Date(res.body.updatedAt).getTime()).to.be.true;
        done();
      });
  });

  it('PUT /projects/wrongId', done => {
    request
      .put('/projects/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.stringify(res.body)).to.equals('{}');
        done();
      });
  });

  it('DELETE /projects/id', done => {
    request
      .delete('/projects/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('DELETE /projects/wrongId', done => {
    request
      .delete('/projects/-1')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
