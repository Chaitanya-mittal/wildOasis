import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCabin } from "../../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";
function useEditCabins() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabinFunc } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin updated successfully");
    },
    onError: (error) => {
      toast.error("Cabin couldnt be updated");
    },
  });
  return { isEditing, editCabinFunc };
}

export default useEditCabins;
