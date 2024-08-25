import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: todayActivity, isPending: loadingActivities } = useQuery({
    queryKey: ["Today"],
    queryFn: getStaysTodayActivity,
  });
  return { todayActivity, loadingActivities };
}

export default useTodayActivity;
