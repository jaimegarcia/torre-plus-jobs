const request = require('supertest');
const app = require('../app.js');
const { expect } = require('chai')



describe('Payments MicroService', () => {
  it('should return client secret from Stripe', (done) => {
    request(app)
      .post('/services/payments/create-payment-intent')
      .end(function(err, res) {   
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.all.keys('clientSecret');
        done(); 
      });
  });
});

describe('Mentors MicroService', () => {
  it('should return list of mentors', (done) => {
    request(app)
      .post('/services/mentors?offset=0&size=20')
      .end(function(err, res) {   
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.all.keys('mentors');
        expect(res.body.mentors[0]).to.have.all.keys('id','username','name','professionalHeadline','picture','weight','compensation');
        expect(res.body.mentors[0].compensation).to.have.all.keys('currency','amount');

        done(); 
      });
  });
});
