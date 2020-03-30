import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "../common/components/technical/Button";
import { roomsUrl } from "../routes/routesConstants";
import AppStore from "../stores/AppStore";
import { login } from "../stores/user/userAction";

interface StateToProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  doLogin: () => void;
}

export type LoginProps = DispatchProps & StateToProps;

const LoginPage: React.FC<LoginProps> = ({ ...props }) => {
  if (props.isLoggedIn) {
    return <Redirect to={roomsUrl} />;
  }
  return (
    <div>
      <Button onClick={props.doLogin}>Se connecter</Button>
    </div>
  );
};

const mapStateToProps = ({ user }: AppStore): StateToProps => {
  return { isLoggedIn: user.isLoggedIn };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  doLogin: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
