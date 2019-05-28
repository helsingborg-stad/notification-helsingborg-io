/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const Notifications = require('./notification.dal');
const { knex } = require('../../db/db.client');

const should = chai.should();
chai.use(chaiHttp);

describe('Notification', () => {
  after(async () => {
    server.close();
    await knex.destroy();
  });

  beforeEach(async () => {
    await Notifications.reset();
  });

  it('should return json on /notification GET', async () => chai
    .request(server)
    .get('/notification?user_id=john_snow')
    .send()
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
      res.body.length.should.equal(0);
    }));

  it('should return 422 on /notification GET without user_id', async () => chai
    .request(server)
    .get('/notification')
    .send()
    .then((res) => {
      res.should.have.status(422);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));

  it('should allow POST with valid body', async () => chai
    .request(server)
    .post('/notification')
    .send({
      user_id: 'john_snow',
      service_id: 'iron_bank',
      message: 'Who is that blonde?',
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
    }));

  it('should correctly add entity to db on POST and return the new entity on GET', async () => {
    const requester = chai.request(server).keepOpen();

    await requester
      .post('/notification')
      .send({
        user_id: 'john_snow',
        service_id: 'iron_bank',
        message: 'Who is that blonde?',
      });

    await requester
      .get('/notification?user_id=john_snow')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body.length.should.equal(1);
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal('john_snow');
        res.body[0].should.have.property('service_id');
        res.body[0].service_id.should.equal('iron_bank');
        res.body[0].should.have.property('message');
        res.body[0].message.should.equal('Who is that blonde?');
        res.body[0].should.have.property('created_at');
        res.body[0].created_at.should.not.equal(null);
        res.body[0].should.have.property('pointer');
        should.equal(res.body[0].pointer, null);
        res.body[0].should.have.property('acced_at');
        should.equal(res.body[0].acced_at, null);
        res.body[0].should.have.property('mail_sent_at');
        should.equal(res.body[0].mail_sent_at, null);
        res.body[0].should.have.property('sms_sent_at');
        should.equal(res.body[0].sms_sent_at, null);
        res.body[0].should.have.property('digi_mail_sent_at');
        should.equal(res.body[0].digi_mail_sent_at, null);
      });

    requester.close();
  });

  it('should not allow POST with invalid user_id', async () => chai
    .request(server)
    .post('/notification')
    .send({
      user_id: 1,
      service_id: 'iron_bank',
      message: 'Who is that blonde?',
    })
    .then((res) => {
      res.should.have.status(422);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));

  it('should not allow POST with invalid service_id', async () => chai
    .request(server)
    .post('/notification')
    .send({
      user_id: 1,
      service_id: 'iron_bank',
      message: 'Who is that blonde?',
    })
    .then((res) => {
      res.should.have.status(422);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));

  it('should not allow POST with invalid message', async () => chai
    .request(server)
    .post('/notification')
    .send({
      user_id: 'john_snow',
      service_id: 'iron_bank',
      message: '',
    })
    .then((res) => {
      res.should.have.status(422);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));

  it('should ignore dates in entity sent to POST', async () => {
    const requester = chai.request(server).keepOpen();
    const date = new Date();

    await requester
      .post('/notification')
      .send({
        user_id: 'john_snow',
        service_id: 'iron_bank',
        message: 'Who is that blonde?',
        created_at: date,
        acced_at: date,
        mail_sent_at: date,
        sms_sent_at: date,
        digi_mail_sent_at: date,
      });

    await requester
      .get('/notification?user_id=john_snow')
      .send()
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.body);
        res.body.length.should.equal(1);
        res.body[0].should.have.property('created_at');
        res.body[0].created_at.should.not.equal(date);
        res.body[0].should.have.property('acced_at');
        should.equal(res.body[0].acced_at, null);
        res.body[0].should.have.property('mail_sent_at');
        should.equal(res.body[0].mail_sent_at, null);
        res.body[0].should.have.property('sms_sent_at');
        should.equal(res.body[0].sms_sent_at, null);
        res.body[0].should.have.property('digi_mail_sent_at');
        should.equal(res.body[0].digi_mail_sent_at, null);
      });

    requester.close();
  });
});
