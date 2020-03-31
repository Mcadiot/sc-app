import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { login } from "../../../stores/user/userAction";
import { HeaderButton } from "../technical/HeaderButton";

interface DispatchProps {
  doLogin: () => void;
}

export type LoginButtonProps = DispatchProps;

const LoginButton: React.FC<LoginButtonProps> = ({ doLogin }) => {
  return (
    <HeaderButton onClick={doLogin}>
      <FontAwesomeIcon icon={faSignInAlt} />
      Se connecter
    </HeaderButton>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doLogin: () => dispatch(login())
});

export default connect(null, mapDispatchToProps)(LoginButton);
