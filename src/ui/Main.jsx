import { Outlet } from "react-router-dom";
import styled from "styled-components";
const StyledMain = styled.section`
  padding: 3rem 4.2rem 4rem;
  background-color: var(--color-grey-50);
`;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Main() {
  return (
    <StyledMain>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledMain>
  );
}

export default Main;
