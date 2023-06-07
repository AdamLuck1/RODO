import express, { Request, Response } from "express";
import { Car } from "../models/Car";
import { calculateMedian } from "../utils/median";
import cache from "../utils/cache";

const router = express.Router();
const cars: Array<Car> = cache.get("dataset") ?? [];

// Search endpoint
router.get("/", (req: Request, res: Response) => {
  try {
    const { make, model, budget, year } = req.query;
    console.log("Query :", req.query);
    let filteredCars = [...cars];

    if (make) {
      filteredCars = filteredCars.filter((car) =>
        car.make.toLowerCase().includes(make.toString().toLowerCase())
      );
    }

    if (model) {
      filteredCars = filteredCars.filter((car) =>
        car.model.toLowerCase().includes(model.toString().toLowerCase())
      );
    }

    if (budget) {
      const budgetFloat = parseFloat(budget.toString());
      const minPrice = budgetFloat - budgetFloat * 0.1;
      const maxPrice = budgetFloat + budgetFloat * 0.1;
      filteredCars = filteredCars.filter(
        (car) => car.price >= minPrice && car.price <= maxPrice
      );
    }

    if (year) {
      filteredCars = filteredCars.filter(
        (car) => car.year === parseInt(year.toString())
      );
    }

    const totalVehicles = filteredCars.length;

    const makeModelCount: Record<string, number> = {};
    filteredCars.forEach((car) => {
      const key = `${car.make}-${car.model}`;
      makeModelCount[key] = makeModelCount[key] ? makeModelCount[key] + 1 : 1;
    });

    const prices = filteredCars.map((car) => car.price);
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);
    const medianPrice = calculateMedian(prices);

    let suggestedVehicles: Car[] = [];

    if (
      (make && model) ||
      (make && year) ||
      (make && year && model) ||
      (model && year)
    ) {
      suggestedVehicles = filteredCars
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
    }
    if (make && !model && !budget && !year) {
      suggestedVehicles = filteredCars
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
    } else if (!model && !make && !budget && !year) {
      suggestedVehicles = filteredCars
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
    } else if (model && !make && !budget && !year) {
      suggestedVehicles = filteredCars
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
    } else if (year && !make && !budget && !model) {
      suggestedVehicles = filteredCars
        .sort((a, b) => a.price - b.price)
        .slice(0, 5);
    } else if (budget) {
      const budgetFloat = parseFloat(budget.toString());
      if (!isNaN(budgetFloat)) {
        const minPrice = budgetFloat - budgetFloat * 0.1;
        const maxPrice = budgetFloat + budgetFloat * 0.1;
        suggestedVehicles = filteredCars
          .filter((car) => car.price >= minPrice && car.price <= maxPrice)
          .sort((a, b) => a.price - b.price)
          .slice(0, 5);
      }
    }

    const searchResults = {
      totalVehicles,
      makeModelCount,
      lowestPrice,
      medianPrice,
      highestPrice,
      suggestedVehicles,
    };
    res.json(searchResults);
  } catch (error) {
    console.error("Error occurred during search:", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
});

module.exports = router;
