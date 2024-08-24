import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

function Logout() {
  const { logoutFunc, islogingout } = useLogout();
  return (
    <ButtonIcon onClick={logoutFunc}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
