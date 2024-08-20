import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: handleDeleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error occured :(");
    },
  });
  return { isDeleting, handleDeleteCabin };
}

export default useDeleteCabin;
