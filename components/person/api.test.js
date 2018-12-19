/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';
require('dotenv').config({ path: './.env.test' });

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

describe('Server', () => {
    after((done) => {
        server.close();
        done();
    });

    it('should return simple json on /test POST', (done) => {
        chai.request(server)
            .post('/person/test')
            .send({
                'id': '199812240101'
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.should.be.json;
                should.exist(res.body);
                done();
            });
    });
});
