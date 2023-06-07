import Car from "./Car";

interface SearchData {
  totalVehicles: number;
  makeModelCount: number;
  lowestPrice: number;
  medianPrice: number;
  highestPrice: number;
  suggestedVehicles: Car[];
}

export default SearchData;
