import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import {
  HiOutlineCalendar,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import useCabins from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
function Stats({ recentBookings, recentStays, confirmedStays }) {
  const bookings = recentBookings.length;
  const { cabins, loadingCabins } = useCabins();
  const [searchParams] = useSearchParams();
  const numAvailableNights = !searchParams.get("last")
    ? 7
    : searchParams.get("last");
  if (loadingCabins) {
    return <Spinner />;
  }
  const sales = recentBookings.reduce(
    (acc, booking) => booking.totalPrice + acc,
    0
  );
  const checkedins = confirmedStays.length;
  const occupancyRate = (
    (confirmedStays.reduce((acc, bookings) => acc + bookings.numNights, 0) /
      (cabins.length * numAvailableNights)) *
    100
  ).toFixed(2);
  return (
    <>
      <Stat
        title="Bookings"
        value={bookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      ></Stat>
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="checkins"
        value={checkedins}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      ></Stat>
      <Stat
        title="Occupancy"
        value={`${occupancyRate}%`}
        icon={<HiOutlineChartBar />}
        color="yellow"
      ></Stat>
    </>
  );
}

export default Stats;
