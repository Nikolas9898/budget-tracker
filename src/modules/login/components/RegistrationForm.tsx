import React from 'react';
import LoginContainerStyle from '../LoginContainerStyle.module.css';

type Props = {
  Submit: () => void;
  errors: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInput: (event: any) => void;
};

const RegistrationForm: React.FC<Props> = ({Submit, errors, handleInput}) => {
  return (
    <div className={LoginContainerStyle.login_content}>
      <label htmlFor="Email" className={LoginContainerStyle.login_label}>
        Email
        <input className={LoginContainerStyle.input} name="email" onChange={handleInput} />
      </label>
      {errors.email && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.email}</span>
        </div>
      )}
      <label htmlFor="Password" className={LoginContainerStyle.login_label}>
        Password
        <input type="password" className={LoginContainerStyle.input} name="password" onChange={handleInput} />
      </label>
      {errors.password && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.password}</span>
        </div>
      )}
      <label htmlFor="Confirm password" className={LoginContainerStyle.login_label}>
        Confirm Password
        <input type="password" className={LoginContainerStyle.input} name="confirmPassword" onChange={handleInput} />
      </label>
      {errors.confirmPassword && (
        <div className={LoginContainerStyle.error_msg}>
          <span>{errors.confirmPassword}</span>
        </div>
      )}
      <button type="button" className={LoginContainerStyle.login_button} onClick={Submit}>
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;
