import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { login } from "../../../stores/user/userAction";
import { HeaderButton } from "./HeaderButton";
import { RightDiv } from "./RightDiv";

interface DispatchProps {
  doLogin: () => void;
}

export type ConnexionButtonProps = DispatchProps;

const ConnexionButton: React.FC<ConnexionButtonProps> = ({ doLogin }) => {
  return (
    <RightDiv>
      <HeaderButton onClick={doLogin}>
        <FontAwesomeIcon icon={faSignInAlt} />
        Se connecter
      </HeaderButton>
    </RightDiv>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doLogin: () => dispatch(login())
});

export default connect(null, mapDispatchToProps)(ConnexionButton);
