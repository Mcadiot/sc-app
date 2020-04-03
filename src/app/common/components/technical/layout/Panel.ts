import styled from "styled-components";

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const PanelLeft = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

export const PanelRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-right: 1em;
  @media only screen and (max-width: 1000px) {
    width: 100%;
    display: inherit;
    padding-left: 1em;
  }
`;
