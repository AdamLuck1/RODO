import express, { Request, Response } from "express";
import { Car } from "../models/Car";
import { calculateMedian } from "../utils/median";
import cache from "../utils/cache";
import { strict } from "assert";

const router = express.Router();
const cars: Array<Car> = cache.get("dataset") ?? [];

router.get("/", (req: Request, res: Response) => {
  const { make } = req.query;

  let filteredCars = [...cars];
  let models = {};

  if (make) {
    models = [
      ...new Set(
        filteredCars
          .filter((car) =>
            car.make.toLowerCase().includes(make.toString().toLowerCase())
          )
          .map((car) => car.model)
      ),
    ];
  }
  res.json(models);
});

module.exports = router;
