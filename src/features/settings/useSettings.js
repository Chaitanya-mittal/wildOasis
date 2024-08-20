import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { isPending: isGetting, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isGetting, settings };
}

export default useSettings;
