import React from "react";
import { connect } from "react-redux";
import AppStore from "../../../stores/AppStore";
import { Anonymous } from "../technical/user/Anonymous";
import { UserInfoContainer } from "./UserInfo";

interface StateToProps {
  isLoggedIn: boolean;
}

export type UserOrAnonymousProps = StateToProps;

export const UserOrAnonymous: React.FC<UserOrAnonymousProps> = ({ isLoggedIn }) => {
  return isLoggedIn ? <UserInfoContainer /> : <Anonymous />;
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return { isLoggedIn: user.isLoggedIn };
};

export const UserOrAnonymousContainer = connect(mapStateToProps)(UserOrAnonymous);
