import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingFunc, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking ${data.id} deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"], // invalidates all queries which contains bookings in its array
      });
    },
    onError: () => {
      toast.error("There was an error while deleting booking");
    },
  });
  return { deleteBookingFunc, isDeleting };
}

export default useDeleteBooking;
