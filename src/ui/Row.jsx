import { css } from "styled-components";

import styled from "styled-components";
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 3rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
