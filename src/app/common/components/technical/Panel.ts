import styled from "styled-components";

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const PanelLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

export const PanelRight = styled(PanelLeft)`
  width: 80%;
`;
