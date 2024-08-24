import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserFunc } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserFunc,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error("Unable to update user details at the moment");
    },
  });
  return { updateUser, isUpdating };
}

export default useUpdateUser;
