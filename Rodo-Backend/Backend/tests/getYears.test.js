const request = require('supertest');
const express = require('express');
const app = express();

const searchRouter = require('../dist/routes/getYears');

app.use('/getYears', searchRouter);

describe('getYears Endpoint', () => {
  it('should return an array of Years for specific model with status 200', async () => {
    const expectedResponse = {
  
    };

    const response = await request(app)
      .get('/getYears')
      .query({model:'Civic'})
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

 
    it('should return an empty object of Years with status 200 if Model was not provided ', async () => {
      const expectedResponse = {
    
      };
  
      const response = await request(app)
        .get('/getYears')
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });


it('should return an empty object of Years with status 200 if Model was not found', async () => {
    const expectedResponse = {
  
    };

    const response = await request(app)
      .get('/getYears')
    .query('testing')
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

});

