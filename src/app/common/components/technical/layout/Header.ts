import styled from "styled-components";

export const Header = styled.header`
  background: ${props => props.theme.colors.headerBackgroundColor};
  color: ${props => props.theme.colors.headerColor};
  padding: 0.5em;
  min-height: 1.375em;
`;
