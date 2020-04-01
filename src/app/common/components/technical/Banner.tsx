import React from "react";
import { UserOrAnonymousContainer } from "../business/UserOrAnonymous";
import { FlexDiv } from "./FlexDiv";
import { Header } from "./Header";

interface BannerProps {
  backUrl?: string;
}
export const Banner: React.FC<BannerProps> = ({ backUrl }) => {
  return (
    <Header>
      <FlexDiv>
        <UserOrAnonymousContainer />
      </FlexDiv>
    </Header>
  );
};
