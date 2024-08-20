import styled from "styled-components";
import Logo from "./Logo";
import Row from "./Row";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSidebar = styled.aside`
  padding: 3rem 2rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Row>
        <Logo />
        <MainNav />
        <Uploader />
      </Row>
    </StyledSidebar>
  );
}

export default Sidebar;
