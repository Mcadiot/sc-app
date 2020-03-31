import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../stores/user/userAction";
import { HeaderCircleButton } from "../technical/HeaderCircleButton";

interface DispatchProps {
  doLogout: () => void;
}

export type LoginButtonProps = DispatchProps;

const LougoutButton: React.FC<LoginButtonProps> = ({ doLogout }) => {
  return (
    <HeaderCircleButton>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={doLogout} title="Se Deconnecter" />
    </HeaderCircleButton>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doLogout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(LougoutButton);
