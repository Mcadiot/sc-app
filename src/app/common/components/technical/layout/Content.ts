import styled from "styled-components";

export const Content = styled.div`
  font: ${props => props.theme.font.font};
  font-size: ${props => props.theme.font.fontsize};
  color: ${props => props.theme.colors.globalColor};
  word-break: break-word;
`;
