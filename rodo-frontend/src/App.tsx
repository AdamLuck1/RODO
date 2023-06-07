import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import DropdownSelector from "./Components/DropdownSelector/DropdownSelector";
import priceRanges from "./StaticData/PriceRanges";
import SearchResults from "./Components/SearchResults/SearchResults";
import SearchData from "./Types/SearchData";
import SearchParams from "./Types/SearchParams";

function App() {
  const [makes, setMakes] = useState<string[]>(["All Makes"]);
  const [models, setModels] = useState<string[]>(["All Models"]);
  const [years, setYears] = useState<string[]>(["Any"]);
  const [maxPrice, setMaxPrice] = useState<string[]>([
    "No max price",
    ...priceRanges,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchData>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    make: null,
    model: null,
    year: null,
    priceRange: null,
  });

  const fetchMakes = async () => {
    await fetch("http://localhost:3000/getMakes")
      .then((data) => data.json())
      .then((data) => setMakes((prev) => [...prev, ...data]))
      .catch((err: Error) => console.log(err));
  };

  const fetchModels = async (make: string) => {
    setSearchParams({ ...searchParams, model: "All Models" });
    setSearchParams({ ...searchParams, year: "Any" });
    setModels(["All Models"]);
    setYears(["Any"]);
    await fetch(`http://localhost:3000/getModels?make=${make}`)
      .then((data) => data.json())
      .then((data) => setModels((prev) => [...prev, ...data]))
      .catch((err: Error) => console.log(err));
  };

  const fetchYears = async (model: string) => {
    setYears(["Any"]);
    await fetch(`http://localhost:3000/getYears?model=${model}`)
      .then((data) => data.json())
      .then((data) => setYears((prev) => [...prev, ...data]))
      .catch((err: Error) => console.log(err));
  };

  const getSearchResults = async () => {
    const make =
      searchParams.make !== "All Makes" && searchParams.make != null
        ? "make=".concat(searchParams.make)
        : "";
    const model =
      searchParams.model !== "All Models" && searchParams.model != null
        ? "&model=".concat(searchParams.model)
        : "";
    const year =
      searchParams.year !== "Any" && searchParams.year != null
        ? "&year=".concat(searchParams.year)
        : "";
    const priceRange =
      searchParams.priceRange !== "No max price" &&
      searchParams.priceRange !== null
        ? "&budget=".concat(searchParams.priceRange!)
        : "";

    setIsLoading(true);
    await fetch(
      `http://localhost:3000/search?${make}${model}${year}${priceRange}`
    )
      .then((data) => data.json())
      .then((data) => setSearchData(data))
      .catch((err: Error) => console.log(err));

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMakes();
  }, []);

  return (
    <div className="wrap">
      <Header />
      <div className="search_container">
        <div className="search_group">
          <DropdownSelector
            label={"Make"}
            optionsList={makes}
            fetchData={fetchModels}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            identifier={"make"}
          />
          <DropdownSelector
            label={"Model"}
            optionsList={models}
            fetchData={fetchYears}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            identifier={"model"}
          />
          <DropdownSelector
            label={"Year"}
            optionsList={years}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            identifier={"year"}
          />
          <DropdownSelector
            label={"Price"}
            optionsList={maxPrice}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            isPrice={true}
            identifier={"priceRange"}
          />
        </div>
        <button className="search_btn" onClick={() => getSearchResults()}>
          Search
        </button>
        {!isLoading && searchData ? (
          <SearchResults searchData={searchData} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
