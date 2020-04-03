import styled from "styled-components";

export const Button = styled.button`
  background: ${props => props.theme.colors.buttonBackground};
  color: ${props => props.theme.colors.buttonColor};
  font: ${props => props.theme.font.font};
  font-size: ${props => props.theme.font.fontsize};
  line-height: 1.875em;
  padding-right: 1em;
  padding-left: 1em;
  border: 0;
  box-shadow: none;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
  svg {
    margin-right: 0.5em;
  }
`;
