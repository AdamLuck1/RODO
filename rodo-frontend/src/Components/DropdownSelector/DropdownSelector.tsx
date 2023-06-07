import { Dispatch, SetStateAction } from "react";
import SearchParams from "../../Types/SearchParams";
import "./DropdownSelector.css";

interface DropdownSelectorProps {
  label: string;
  optionsList: string[];
  fetchData?: (value: string) => void;
  isPrice?: boolean;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  identifier?: string;
}

const DropdownSelector = ({
  label,
  optionsList,
  fetchData,
  isPrice,
  searchParams,
  setSearchParams,
  identifier,
}: DropdownSelectorProps) => {
  return (
    <div className="select_field">
      <label>{label}</label>
      <select
        onChange={
          fetchData && searchParams
            ? (e: any) => {
                fetchData((e?.target as HTMLInputElement)?.value);
                setSearchParams({
                  ...searchParams,
                  [identifier as keyof SearchParams]: (
                    e?.target as HTMLInputElement
                  )?.value,
                });
              }
            : (e: any) => {
                setSearchParams({
                  ...searchParams,
                  [identifier as keyof SearchParams]: (
                    e?.target as HTMLInputElement
                  )?.value,
                });
              }
        }
      >
        {optionsList?.map((option: string, i: number) => {
          return (
            <option value={option} key={i}>
              {isPrice && i !== 0 ? "$" : null}
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownSelector;
