const request = require('supertest');
const express = require('express');
const app = express();

const searchRouter = require('../dist/routes/getModels');

app.use('/getModels', searchRouter);

describe('getModels Endpoint', () => {
  it('should return an array of Models with status 200', async () => {
    const expectedResponse = {
  
    };

    const response = await request(app)
      .get('/getModels')
      .query({make:'Honda'})
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

 
    it('should return an empty object of Models with status 200 if Make was not provided', async () => {
      const expectedResponse = {
    
      };
  
      const response = await request(app)
        .get('/getModels')
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return an empty object of Models with status 200 if Model was not found', async () => {
      const expectedResponse = {
    
      };
  
      const response = await request(app)
        .get('/getModels')
      .query('testing')
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  
  });

