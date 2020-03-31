import React from "react";
import { UserOrAnonymousContainer } from "../business/UserOrAnonymous";
import { FlexDiv } from "./FlexDiv";
import { Header } from "./Header";

export const Banner: React.FC = () => {
  return (
    <Header>
      <FlexDiv>
        <UserOrAnonymousContainer />
      </FlexDiv>
    </Header>
  );
};
