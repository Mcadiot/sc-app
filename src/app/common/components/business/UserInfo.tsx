import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import AppStore from "../../../stores/AppStore";
import { BoldSpan } from "../technical/BoldSpan";
import { RightDiv } from "../technical/layout/RightDiv";
import LogoutButton from "./LogoutButton";
interface StateToProps {
  userName: string;
}

export type UserInfoProps = StateToProps;

export const UserInfo: React.FC<UserInfoProps> = ({ userName }) => {
  return (
    <RightDiv>
      <BoldSpan>{userName}</BoldSpan>
      <FontAwesomeIcon icon={faUserCircle} title="Utilisateur" />
      <LogoutButton />
    </RightDiv>
  );
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return { userName: user.userInfo && user.userInfo.name ? user.userInfo.name : "" };
};

export const UserInfoContainer = connect(mapStateToProps)(UserInfo);
