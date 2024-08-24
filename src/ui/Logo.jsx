import styled from "styled-components";
import { useThemeContext } from "../context/ThemeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useThemeContext();

  const imgSrc = isDarkMode ? "img/logo-dark.png" : "img/logo-light.png";
  return (
    <StyledLogo>
      <Img src={imgSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
