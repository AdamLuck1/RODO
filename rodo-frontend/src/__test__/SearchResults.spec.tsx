import { render, screen } from "@testing-library/react";
import SearchResults from "../Components/SearchResults/SearchResults";

describe("<DropdownSelector />", () => {
  it("should display the total count of the vehicles in the table", () => {
    render(
      <SearchResults
        searchData={{
          totalVehicles: 5,
          makeModelCount: 34,
          lowestPrice: 15000,
          medianPrice: 22000,
          highestPrice: 28000,
          suggestedVehicles: [
            {
              make: "Audi",
              model: "A8",
              year: 2021,
              vehicle_count: 234,
              price: 35000,
            },
          ],
        }}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should display the median price of the vehicles in the table", () => {
    render(
      <SearchResults
        searchData={{
          totalVehicles: 5,
          makeModelCount: 0,
          lowestPrice: 0,
          medianPrice: 22000,
          highestPrice: 0,
          suggestedVehicles: [
            {
              make: "Audi",
              model: "A8",
              year: 2023,
              vehicle_count: 800,
              price: 35000,
            },
          ],
        }}
      />
    );

    expect(screen.getByText("22000")).toBeInTheDocument();
  });

  it("should display the lowest and highest price of the vehicles", () => {
    render(
      <SearchResults
        searchData={{
          totalVehicles: 5,
          makeModelCount: 34,
          lowestPrice: 15000,
          medianPrice: 22000,
          highestPrice: 28000,
          suggestedVehicles: [
            {
              make: "Honda",
              model: "Civic",
              year: 2017,
              vehicle_count: 999,
              price: 42450,
            },
          ],
        }}
      />
    );

    expect(screen.getByText("15000")).toBeInTheDocument();
    expect(screen.getByText("28000")).toBeInTheDocument();
  });

  it("should display details of one of the suggested vehicles in the table", () => {
    render(
      <SearchResults
        searchData={{
          totalVehicles: 0,
          makeModelCount: 0,
          lowestPrice: 0,
          medianPrice: 0,
          highestPrice: 0,
          suggestedVehicles: [
            {
              make: "Chrysler",
              model: "Some Model",
              year: 2024,
              vehicle_count: 1000,
              price: 0,
            },
          ],
        }}
      />
    );

    expect(screen.getByText("Chrysler")).toBeInTheDocument();
    expect(screen.getByText("Some Model")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });
});
