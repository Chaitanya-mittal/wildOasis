import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { mutate: loginFunc, isPending: isloging } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      //   console.log(data);
      toast.success("Logged in successfully");
      queryclient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provideed password or email is incorrect");
    },
  });
  return { loginFunc, isloging };
}

export default useLogin;
