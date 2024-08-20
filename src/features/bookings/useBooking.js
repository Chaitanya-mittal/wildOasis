import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { id } = useParams();
  const { data: booking, loadingBooking } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(Number(id)),
  });

  return { booking, loadingBooking };
}

export default useBooking;
