import request from 'supertest';
const { app } = require('../app.js');

describe('Basic Express Server Tests', () => {

  it('should return hello for a get request on /', (done) => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe('hello');
        done();
      });
  });

  it('should return data for a post request on /save', (done) => {
    request(app)
      .post('/save')
      .send({name:'Katherine'})
      .then(response => { 
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Katherine');
        done();
      });
  });

  it('should return 404 for a get request on /save', (done) => {
    request(app)
      .get('/save')
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.text).toMatch(/Page Not Found/);
        done();
      });
  });

  it('should return 400 for a bad request', (done) => {
    request(app)
      .post('/%')
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toMatch(/Error/);
        done();
      });
  });

});
