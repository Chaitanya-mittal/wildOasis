import styled from "styled-components";
const StyledHeader = styled.header`
  padding: 2rem 4.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
`;
function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
