import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
function useCreateCabins() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabinFunc } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("failed to create cabin");
    },
  });
  return { isCreating, createCabinFunc };
}

export default useCreateCabins;
