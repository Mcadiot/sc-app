import React from "react";
import { UserOrAnonymousContainer } from "../business/UserOrAnonymous";
import { FlexDiv } from "./layout/FlexDiv";
import { Header } from "./layout/Header";

interface BannerProps {
  backUrl?: string;
}
export const Banner: React.FC<BannerProps> = ({ backUrl }) => {
  return (
    <Header>
      <FlexDiv role="banner">
        <UserOrAnonymousContainer />
      </FlexDiv>
    </Header>
  );
};
