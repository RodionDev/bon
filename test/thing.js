process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Thing = require('../models/thing');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);
describe('Things', () => {
  beforeEach((done) => {
    Thing.remove({}, (err) => {
      done();
    });
  });
  describe('/GET thing', () => {
    it('it should GET no things', (done) => {
      chai.request(app)
        .get('/api/thing')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
