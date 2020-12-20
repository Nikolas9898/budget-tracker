import React, { useState } from "react";
import LoginContainerStyle from "./LoginContainerStyle.module.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import SocialNetworks from "./components/SocialNetworks";

const LoginContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  const handleChoose = () => {
    if (isLogin) {
      setIsLogin(false);
      setErrors({ email: "", password: "", confirmPassword: "" });
    } else {
      setIsLogin(true);
      setErrors({ email: "", password: "", confirmPassword: "" });
    }
  };
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
    if (
      user.password !== user.confirmPassword ||
      !user.password.match(/^[0-9a-zA-Z]+$/) ||
      user.password.length > 20 ||
      user.password.length < 6
    ) {
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
  const handleLogin = () => {
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
  const handleRegister = () => {
    const errors = validateForm();
    console.log(errors);
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
        <div className={LoginContainerStyle.select_login}>
          <div
            onClick={handleChoose}
            className={`${
              isLogin
                ? LoginContainerStyle.select_title_selected
                : LoginContainerStyle.select_title
            }`}
          >
            Sign In
          </div>
          <div
            onClick={handleChoose}
            className={`${
              isLogin
                ? LoginContainerStyle.select_title
                : LoginContainerStyle.select_title_selected
            }`}
          >
            Register
          </div>
        </div>
        <div className={LoginContainerStyle.login_content}>
          {isLogin ? (
            <LoginForm
              Submit={handleLogin}
              errors={errors}
              handleInput={handleInputChange}
            />
          ) : (
            <RegistrationForm
              Submit={handleRegister}
              errors={errors}
              handleInput={handleInputChange}
            />
          )}
        </div>
        <SocialNetworks />
      </div>
    </div>
  );
};

export default LoginContainer;
