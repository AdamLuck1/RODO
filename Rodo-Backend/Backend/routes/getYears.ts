import express, { Request, Response } from 'express';
import { Car } from '../models/Car';
import cache from '../utils/cache';

const router = express.Router()
const cars: Array<Car>  = cache.get('dataset') ?? []


router.get('/', (req: Request, res: Response) => {
    const { model } = req.query;

  let filteredCars = [...cars];
  let years = {};

  if (model) {

     years = filteredCars.filter(car =>car.model.toLowerCase() === model.toString().toLowerCase()).map(item => item.year);
  }
  
  res.json(years);


});

module.exports = router;

