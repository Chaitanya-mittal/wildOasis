import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", field: "All" },
          { value: "checked-out", field: "Checked out" },
          { value: "checked-in", field: "Checked in" },
          { value: "unconfirmed", field: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", field: "Sort by date (recent first)" },
          { value: "startDate-asc", field: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            field: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", field: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
