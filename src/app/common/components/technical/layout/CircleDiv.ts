import styled from "styled-components";

export const RedCircleDiv = styled.div`
  background-color: ${props => props.theme.colors.occupiedRoomColor};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  top: -0.1em;
  position: relative;
  margin-right: 0.5em;
`;

export const GreenCircleDiv = styled(RedCircleDiv)`
  background-color: ${props => props.theme.colors.freeRoomColor};
`;
