const request = require('supertest');
const express = require('express');
const app = express();

const searchRouter = require('../dist/routes/search');

app.use('/search', searchRouter);

describe('Search Endpoint', () => {
  it('should return search results with status 200', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({ make: 'Honda', model: 'Civic', budget: 35000, year: 2017 });

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

  
  it('should return null values with status 200 for incorrect parameters', async () => {
    const response = await request(app)
      .get('/search')
      .query({ make: 'Honda', model: 'Civic', budget: 200000, year: 2018 });

    expect(response.status).toBe(200);
    expect(response.body.totalVehicles).toBe(0);
    expect(response.body.makeModelCount).toEqual({});
    expect(response.body.lowestPrice).toBeNull();
    expect(response.body.medianPrice).toBeNull();
    expect(response.body.highestPrice).toBeNull();
    expect(response.body.suggestedVehicles).toEqual([]);
  });

  it('should return search results with status 200 if no parameter is provided', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({});

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });


  it('should return search results with status 200 if only make was provided', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({make : "Honda"});

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });


  it('should return search results with status 200 if only model was provided', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({model : "A3"});

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

  
  it('should return search results with status 200 if only budget was provided', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({budget : "1000"});

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

    
  it('should return search results with status 200 if only year was provided', async () => {
    const expectedResponse = {
      totalVehicles: 0,
      makeModelCount: {},
      lowestPrice: null,
      medianPrice: null,
      highestPrice: null,
      suggestedVehicles: [],
    };

    const response = await request(app)
      .get('/search')
      .query({year : "2020"});

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual(expectedResponse);
  });

});

