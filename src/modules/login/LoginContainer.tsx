import React, { useState } from "react";
import LoginContainerStyle from "./LoginContainerStyle.module.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import SocialNetworks from "./components/SocialNetworks";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singIn } from "../../store/actions/usersActions";
import axios from "axios";

const LoginContainer = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const dispatch = useDispatch();

  const handleInputChange = (e: any) =>
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });

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
    if (user.password !== user.confirmPassword && !isLogin) {
      errors.confirmPassword = "The password does not match. ";
    }
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
    }
    localStorage.removeItem("jwt");
    let loggedUser = await axios.post(`http://localhost:5000/signIn`, user);

    if (loggedUser.data.user) {
      dispatch(singIn(loggedUser.data));
      await setErrors({ email: "", password: "", confirmPassword: "" });
      window.location.pathname = "/transaction/monthly";
    } else {
      setErrors({
        email: "",
        password: loggedUser.data.errorMSG,
        confirmPassword: "",
      });
    }
  };
  const handleRegister = async () => {
    const errors = validateForm();
    const isValid = Object.values(errors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors({
        email: errors.email,
        password: errors.password,
        confirmPassword: errors.confirmPassword,
      });
      return;
    }
    localStorage.removeItem("jwt");

    let newUser = {
      username: user.email,
      email: user.email,
      password: user.password,
      type: "admin",
      currency: "BG",
      categories: [],
    };
    try {
      let signUp = await axios.post(`http://localhost:5000/signUp`, newUser);
      setErrors({ email: "", password: "", confirmPassword: "" });
      dispatch(singIn(signUp.data.data));
      window.location.pathname = "/transaction/monthly";
    } catch (e) {
      console.error(e);
      return [];
    }
  };
  return (
    <div className={LoginContainerStyle.container}>
      <div className={LoginContainerStyle.login_form}>
        <Tabs selectedTabClassName={LoginContainerStyle.selected_tab}>
          <TabList className={LoginContainerStyle.tab_list}>
            <Tab
              className={LoginContainerStyle.tab}
              onClick={() => {
                setErrors({ email: "", password: "", confirmPassword: "" });
                setIsLogin(true);
              }}
            >
              Sign In
            </Tab>
            <Tab
              className={LoginContainerStyle.tab}
              onClick={() => {
                setErrors({ email: "", password: "", confirmPassword: "" });
                setIsLogin(true);
              }}
            >
              Register
            </Tab>
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
