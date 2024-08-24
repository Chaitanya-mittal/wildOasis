import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutFunc, isPending: islogingOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logout successful");
      navigate("/login", { replace: true });
      queryclient.removeQueries(); // wont invalidate queries
      //   either this or below one
      //   queryclient.invalidateQueries({ active: true });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Unable to logout at the moment");
    },
  });
  return { logoutFunc, islogingOut };
}

export default useLogout;
