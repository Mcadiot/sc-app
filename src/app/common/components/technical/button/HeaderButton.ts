import styled from "styled-components";

export const HeaderButton = styled.button`
  background: ${props => props.theme.colors.headerButtonBackgroundColor};
  color: ${props => props.theme.colors.buttonColor};
  font: ${props => props.theme.font.font};
  font-size: ${props => props.theme.font.fontsize};
  padding-right: 1em;
  padding-left: 1em;
  border: 0;
  box-shadow: none;
  border-radius: 0px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: ${props => props.theme.colors.headerBackgroundColor};
  }

  svg {
    padding-right: 0.5em;
    margin-left: 0;
  }
`;
