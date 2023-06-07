import express, { Request, Response } from 'express';
import { Car } from '../models/Car';
import cache from '../utils/cache';

const router = express.Router()
const cars: Array<Car>  = cache.get('dataset') ?? []


router.get('/', (req: Request, res: Response) => {

  let filteredCars = [...cars];
  let makes = {};
  makes = [...new Set(filteredCars.map(item => item.make))];
  res.json(makes);
});

module.exports = router;

