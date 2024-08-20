import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            field: "All",
            value: "all",
          },
          {
            field: "Discount",
            value: "discount",
          },
          {
            field: "No Discount",
            value: "no-discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            field: "Sort by name (A-Z)",
          },
          {
            value: "name-desc",
            field: "Sort by name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            field: "Sort by price (low first)",
          },
          {
            value: "regularPrice-desc",
            field: "Sort by price (high first)",
          },
          {
            value: "maxCapacity-asc",
            field: "Sort by capacity (low first)",
          },
          {
            value: "maxCapacity-desc",
            field: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
