import Car from "../../Types/Car";
import SearchData from "../../Types/SearchData";
import "./SearchResults.css";

interface SearchMatchesProps {
  searchData: SearchData;
}

const SearchResults = ({ searchData }: SearchMatchesProps) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Total Vehicles Matched</th>
            <th>
              {searchData?.totalVehicles ? searchData?.totalVehicles : "0"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w">Lowest Price</td>
            <td>{searchData?.lowestPrice ? searchData?.lowestPrice : "N/A"}</td>
          </tr>
          <tr>
            <td>Median Price</td>
            <td>{searchData?.medianPrice ? searchData?.medianPrice : "N/A"}</td>
          </tr>
          <tr>
            <td>Highest Price</td>
            <td>
              {searchData?.highestPrice ? searchData?.highestPrice : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      {searchData?.suggestedVehicles?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Matches by Make and Model </th>
            </tr>
          </thead>
          <tbody>
            {searchData?.suggestedVehicles?.map((car: Car) => {
              return (
                <tr>
                  <td className="w">
                    <span className="make-sub-grp">{car?.make}</span>{" "}
                    <span className="model-sub-grp">{car?.model}</span>
                  </td>
                  <td>{car?.vehicle_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default SearchResults;
