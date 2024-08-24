import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const currLast = !searchParams.get("last") ? 7 : searchParams.get("last");

  const { isPending: isLoadingRecentBookings, data: recentBookings } = useQuery(
    {
      queryKey: ["bookings", `last-${currLast}`],
      queryFn: () =>
        getBookingsAfterDate(subDays(new Date(), currLast).toISOString()),
    }
  );
  return { recentBookings, isLoadingRecentBookings };
}

export default useRecentBookings;
