import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currSorter = searchParams.get("sortBy") || options[0].value;
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      onChange={handleChange}
      options={options}
      value={currSorter}
      type="white"
    />
  );
}

export default SortBy;
