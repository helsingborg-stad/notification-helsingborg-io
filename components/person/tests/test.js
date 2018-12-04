process.env.NODE_ENV = 'test';
// loads the .env file for tests
require('dotenv').config({ path: './.env.test' });

const chai = require('chai');
const server = require('../app.js');
const should = chai.should();
chai.use(require('chai-http'));

/* eslint-disable no-undef */
// chai don't fully support the () => {} arrow function so don't use it
// when writing you're tests
describe('Server', function () {
    // closes the connection to the server after your test is completed
    // so you can run more tests to the server
    after(function (done) {
        server.close();
        done();
    });

    it('testing getNavet', function (done) {
        chai.request(server)
            .get('/getNavet')
            .send({
                id: '195003072260'
            })
            .end(function (err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.Folkbokforingspost.Personpost.PersonId.PersonNr.should.equal('195003072260');
                done();
            });
    });
});
