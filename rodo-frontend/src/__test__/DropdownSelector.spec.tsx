import { render, screen } from "@testing-library/react";
import DropdownSelector from "../Components/DropdownSelector/DropdownSelector";

describe("<DropdownSelector />", () => {
  it("should display the Make label of the dropdown", () => {
    render(
      <DropdownSelector
        label={"Makes"}
        optionsList={["Honda", "Toyota", "Audi"]}
        fetchData={() => {}}
        isPrice={false}
        searchParams={{ make: null, model: null, year: null, priceRange: null }}
        setSearchParams={() => {}}
        identifier={"make"}
      />
    );

    expect(screen.getByText("Makes")).toBeInTheDocument();
  });

  it("should display the Make label of the dropdown and also one of the models", () => {
    render(
      <DropdownSelector
        label={"Models"}
        optionsList={["civic", "city", "crz"]}
        fetchData={() => {}}
        isPrice={false}
        searchParams={{ make: null, model: null, year: null, priceRange: null }}
        setSearchParams={() => {}}
        identifier={"make"}
      />
    );

    expect(screen.getByText("civic")).toBeInTheDocument();
    expect(screen.getByText("Models")).toBeInTheDocument();
  });

  it("should display the years that are available to be selected in the dropdown", () => {
    render(
      <DropdownSelector
        label={"Years"}
        optionsList={["2020", "2021", "2022"]}
        fetchData={() => {}}
        isPrice={false}
        searchParams={{ make: null, model: null, year: null, priceRange: null }}
        setSearchParams={() => {}}
        identifier={"year"}
      />
    );

    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });
  it("should display the price ranges available & also check if the dollar ($) sign is being prefixed", () => {
    render(
      <DropdownSelector
        label={"Price"}
        optionsList={["No max price", "10000", "20000", "30000"]}
        fetchData={() => {}}
        isPrice={true}
        searchParams={{ make: null, model: null, year: null, priceRange: null }}
        setSearchParams={() => {}}
        identifier={"priceRange"}
      />
    );

    expect(screen.getByText("$10000")).toBeInTheDocument();
    expect(screen.getByText("$20000")).toBeInTheDocument();
    expect(screen.getByText("$30000")).toBeInTheDocument();
  });
});
