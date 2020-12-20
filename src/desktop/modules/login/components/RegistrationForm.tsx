import React from "react";
import LoginContainerStyle from "../LoginContainerStyle.module.css";

type Props = {
  Submit: () => void;
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInput: (event: any) => void;
};

const RegistrationForm: React.FC<Props> = ({ Submit, errors, handleInput }) => {
  return (
    <div>
      <label className={LoginContainerStyle.login_label}>Email</label>
      <input
        className={LoginContainerStyle.input}
        name="email"
        onChange={handleInput}
      />
      {errors.email && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.email}</span>
        </div>
      )}
      <label className={LoginContainerStyle.login_label}>Password</label>
      <input
        // type="password"
        className={LoginContainerStyle.input}
        name="password"
        onChange={handleInput}
      />
      {errors.password && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.password}</span>
        </div>
      )}
      <label className={LoginContainerStyle.login_label}>
        Confirm Password
      </label>
      <input
        // type="password"
        className={LoginContainerStyle.input}
        name="confirmPassword"
        onChange={handleInput}
      />
      {errors.confirmPassword && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.confirmPassword}</span>
        </div>
      )}
      <button className={LoginContainerStyle.login_button} onClick={Submit}>
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;
