const chai = require('chai');
const chaiHttp = require('chai-http');
const expect  = chai.expect;
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('home', () => {
  describe('GET /', () => {
    it('should get the home page', done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});