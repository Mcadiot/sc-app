import React from "react";
import styled from "styled-components";
import { FlexDiv } from "./FlexDiv";
import { RightDiv } from "./RightDiv";

const ButtonAreaContainer = styled(FlexDiv)`
  button {
    margin-left: 1em;
  }
`;

export const ButtonArea: React.FC = ({ children }) => {
  return (
    <ButtonAreaContainer>
      <RightDiv>{children}</RightDiv>
    </ButtonAreaContainer>
  );
};
