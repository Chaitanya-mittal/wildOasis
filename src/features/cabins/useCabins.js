import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
function useCabins() {
  const { data: cabins, isPending: loadingCabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { cabins, loadingCabins };
}

export default useCabins;
