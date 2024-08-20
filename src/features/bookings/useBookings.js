import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  // we will do api filtering i.e we are going to fetch the requried data only
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const currPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const sortBasis = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBasis.split("-");
  const sortBy = { field, direction };
  // we initialise here as we are destructing
  const { data: { data: bookings, count } = {}, isPending: loadingBookings } =
    useQuery({
      queryKey: ["bookings", filter, sortBy, currPage], // also acts as a dependency array , if changes  -> refetches data
      queryFn: () => getBookings({ filter, sortBy, currPage }),
    });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currPage + 1], // also acts as a dependency array , if changes  -> refetches data
      queryFn: () => getBookings({ filter, sortBy, currPage: currPage + 1 }),
    });
  }
  if (currPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currPage - 1], // also acts as a dependency array , if changes  -> refetches data
      queryFn: () => getBookings({ filter, sortBy, currPage: currPage - 1 }),
    });
  }
  return { bookings, loadingBookings, count };
}

export default useBookings;
