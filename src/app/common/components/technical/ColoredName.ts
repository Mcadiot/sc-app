import styled from "styled-components";

export const ColoredName = styled.h2`
  color: white;
  background-color: ${props => props.theme.colors.cardNameBackgroundColor};
  font-size: 300%;
  font-weight: bold;
  line-height: 5em;
  margin-block-start: 0;
  margin-block-end: 0;
`;
