import styled from "styled-components";

export const ColoredName = styled.h2`
  background-color: ${props => props.theme.colors.cardNameBackgroundColor};
  color: white;
  height: 6em;
  font-size: 175%;
  font-weight: bold;
  margin-block-start: 0;
  margin-block-end: 0;
  word-wrap: break-word;
  padding: 0.5em;
  line-height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: N;
  word-break: break-word;
  overflow-y: auto;
`;
