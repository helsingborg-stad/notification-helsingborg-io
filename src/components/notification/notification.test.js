/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

describe('Notification', () => {
  after((done) => {
    server.close();
    done();
  });

  it('should return json on /notification GET', (done) => {
    chai.request(server)
      .get('/notification')
      .send()
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        done();
      });
  });
});
