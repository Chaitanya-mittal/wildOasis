import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
function CabinTable() {
  const { cabins = [], loadingCabins } = useCabins();

  const [searchParams, setSearchParams] = useSearchParams();

  if (loadingCabins) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabin"></Empty>;

  const currentFilter = searchParams.get("discount") || "all";
  const currentSorter = searchParams.get("sortBy") || "name-asc";

  let filteredCabins;

  if (currentFilter === "all") {
    filteredCabins = cabins;
  }
  if (currentFilter === "discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  if (currentFilter === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const [field, direction] = currentSorter.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  console.log(cabins, filteredCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
