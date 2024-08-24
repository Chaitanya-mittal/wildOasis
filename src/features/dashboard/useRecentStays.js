import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const currLast = !searchParams.get("last") ? 7 : searchParams.get("last");

  const { isPending: isLoadingRecentStays, data: recentStays } = useQuery({
    queryKey: ["stays", `last-${currLast}`],
    queryFn: () =>
      getStaysAfterDate(subDays(new Date(), currLast).toISOString()),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { recentStays, isLoadingRecentStays, confirmedStays };
}

export default useRecentStays;
