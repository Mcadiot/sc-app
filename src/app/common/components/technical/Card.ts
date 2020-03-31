import styled from "styled-components";

export const Card = styled.div`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 20em;
  min-height: 20em;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;
