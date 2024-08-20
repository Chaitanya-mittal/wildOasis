import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";

const StyledAppLayout = styled.section`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main />
    </StyledAppLayout>
  );
}

export default AppLayout;
