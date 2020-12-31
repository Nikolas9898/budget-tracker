import React from "react";
import LoginContainerStyle from "../LoginContainerStyle.module.css";

type Props = {
  Submit: () => void;
  errors: {
    email: string;
    password: string;
  };
  handleInput:(event:any)=>void;
};

const LoginForm: React.FC<Props> = ({ Submit, errors, handleInput }) => {
  return (
    <div className={LoginContainerStyle.login_content}>
      <label className={LoginContainerStyle.login_label}>Email</label>
      <input className={LoginContainerStyle.input} name="email" onChange={handleInput} />
      {errors.email && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.email}</span>
        </div>
      )}
      <label className={LoginContainerStyle.login_label}>Password</label>
      <input  className={LoginContainerStyle.input} name="password" onChange={handleInput} />
      {errors.password && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.password}</span>
        </div>
      )}
      <button className={LoginContainerStyle.login_button} onClick={Submit}>
        Log in
      </button>
    </div>
  );
};

export default LoginForm;
