import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { UserReducer } from "../../models/User";
import { getUserByJWToken } from "../../modules/transaction/service/TransactionService";
import { singIn } from "../../store/actions/usersActions";

type Props = {
  stateUser: UserReducer;
  onAuthorized: string;
  onUnAuthorized: string;
  pageReload: boolean;
  children: any;
};

const Redirected = (url: string, pageReload: boolean) => {
  const location = useHistory();

  if (pageReload === true) {
    location.push(url);
    return <div />;
  }

  return <Redirect to={url} />;
};
const IsAuthorized: React.FC<Props> = ({
  onAuthorized,
  onUnAuthorized,
  pageReload,
  stateUser,
  children,
}) => {
  const dispatch = useDispatch();

  if (onUnAuthorized && !stateUser.user.username) {
    if (localStorage.getItem("jwt") && !stateUser.user.username) {
      getUserByJWToken().then(data => {
        if (data.length === 0) {
          localStorage.removeItem("jwt");
          if (localStorage.getItem("jwt") === null) {
            window.location.pathname = "/authentication";
          }
        } else {
          dispatch(singIn(data));
        }
      });
    } else {
      return Redirected(onUnAuthorized, pageReload);
    }
  }
  if (onAuthorized && stateUser.user.username) {
    return Redirected(onAuthorized, pageReload);
  }

  return children;
};

const mapStateToProps = (state: { userReducer: UserReducer }) => {
  return {
    stateUser: state.userReducer,
  };
};

export default connect(mapStateToProps)(IsAuthorized);
