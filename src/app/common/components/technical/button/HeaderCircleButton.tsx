import styled from "styled-components";

export const HeaderCircleButton = styled.button`
  background: ${props => props.theme.colors.headerButtonBackgroundColor};
  color: ${props => props.theme.colors.buttonColor};
  font: ${props => props.theme.font.font};
  font-size: ${props => props.theme.font.fontsize};
  border: 0;
  box-shadow: none;
  border-radius: 50%;
  width: 1.6em;
  height: 1.6em;
  margin-left: 0.5em;
  margin-top: -0.2em;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.headerBackgroundColor};
  }

  svg {
    margin-left: 0;
  }
`;
