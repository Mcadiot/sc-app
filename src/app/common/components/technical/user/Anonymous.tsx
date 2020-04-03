import React from "react";
import LoginButton from "../../business/LoginButton";
import { RightDiv } from "../layout/RightDiv";

export const Anonymous: React.FC = () => {
  return (
    <RightDiv>
      <LoginButton />
    </RightDiv>
  );
};
