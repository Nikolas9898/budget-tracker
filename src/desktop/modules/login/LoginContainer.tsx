import React, { useState } from "react";
import LoginContainerStyle from "./LoginContainerStyle.module.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import SocialNetworks from "./components/SocialNetworks";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/reducers/userReducer";
import { singIn } from "../../store/actions/usersActions";
import axios from "axios";
import { sign } from "crypto";

const LoginContainer = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const qE = useSelector((state: State) => state.user);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) =>
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  // const handleChoose = () => {
  //   if (isLogin) {
  //     setIsLogin(false);
  //     setErrors({ email: "", password: "", confirmPassword: "" });
  //   } else {
  //     setIsLogin(true);
  //     setErrors({ email: "", password: "", confirmPassword: "" });
  //   }
  // };
  const validateForm = () => {
    const isValidEmail = RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    let errors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!isValidEmail.test(user.email)) {
      errors.email = "Please enter a valid email.";
    }
    // if (
    //   user.password !== user.confirmPassword ||
    //   !user.password.match(/^[0-9a-zA-Z]+$/) ||
    //   user.password.length > 20 ||
    //   user.password.length < 6
    // ) {
    //   errors.confirmPassword = "The password does not match. ";
    // }
    if (
      !user.password.match(/^[0-9a-zA-Z]+$/) ||
      user.password.length > 20 ||
      user.password.length < 6
    ) {
      errors.password = "Please enter 6-20 characters [A-Z, a-z, 0-9 only].";
    }

    return errors;
  };
  const handleLogin = async () => {
    const errors = validateForm();

    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      setErrors({
        email: errors.email,
        password: errors.password,
        confirmPassword: errors.confirmPassword,
      });
      return;
    } else {
      // dispatch(singIn(user));

      let loggedUser = await axios.post(`http://localhost:5000/signIn`, user);

      if (loggedUser.data.user) {
        dispatch(singIn(loggedUser.data));
        history.push("./transaction/monthly");
      }

      setErrors({ email: "", password: "", confirmPassword: "" });
    }
  };
  const handleRegister = () => {
    const errors = validateForm();
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      setErrors({
        email: errors.email,
        password: errors.password,
        confirmPassword: errors.confirmPassword,
      });
      return;
    } else {
      setErrors({ email: "", password: "", confirmPassword: "" });
    }
  };
  return (
    <div className={LoginContainerStyle.container}>
      <div className={LoginContainerStyle.login_form}>
        {console.log(qE)}
        <Tabs selectedTabClassName={LoginContainerStyle.selected_tab}>
          <TabList className={LoginContainerStyle.tab_list}>
            <Tab className={LoginContainerStyle.tab}>Sign In</Tab>
            <Tab className={LoginContainerStyle.tab}>Register</Tab>
          </TabList>
          <TabPanel>
            <LoginForm
              Submit={handleLogin}
              errors={errors}
              handleInput={handleInputChange}
            />
          </TabPanel>
          <TabPanel>
            <RegistrationForm
              Submit={handleRegister}
              errors={errors}
              handleInput={handleInputChange}
            />
          </TabPanel>
        </Tabs>
        <SocialNetworks />
      </div>
    </div>
  );
};

export default LoginContainer;
