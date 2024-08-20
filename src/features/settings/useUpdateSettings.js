import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettingsFunc } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Succesfully updated setting");
    },
    onError: () => {
      toast.error("Setting not updated");
    },
  });
  return { isUpdating, updateSettingsFunc };
}

export default useUpdateSettings;
