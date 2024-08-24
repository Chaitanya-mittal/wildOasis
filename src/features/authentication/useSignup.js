import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupUser } from "../../services/apiAuth";

function useSignup() {
  const { mutate: signupFunc, isPending: isSigning } = useMutation({
    mutationFn: signupUser,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully. Please verify the account using your email."
      );
    },
    onError: () => {
      toast.error("Unable to create user");
    },
  });
  return { signupFunc, isSigning };
}

export default useSignup;
