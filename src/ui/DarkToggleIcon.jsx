import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useThemeContext } from "../context/ThemeContext";

function DarkToggleIcon() {
  const { toggleDarkMode, isDarkMode } = useThemeContext();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkToggleIcon;
