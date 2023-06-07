import Car from "./Car";

interface SearchMatch {
  totalVehicles?: string;
  lowestPrice?: string;
  medianPrice?: string;
  highestPrice?: string;
  suggestedVehicles?: Car[];
}

export default SearchMatch;
