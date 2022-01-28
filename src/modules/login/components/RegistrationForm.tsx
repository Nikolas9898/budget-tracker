import React from 'react';
import languageWords from '../../../helpers/LanguageConsts';
import classes from '../LoginContainerStyle.module.css';

type Props = {
  Submit: () => void;
  errors: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegistrationForm: React.FC<Props> = ({Submit, errors, handleInput}) => {
  return (
    <div className={classes.login_content}>
      <label htmlFor="Username" className={classes.login_label}>
        {languageWords.USERNAME}

        <input className={classes.input} name="username" onChange={handleInput} />
      </label>
      {errors.username && (
        <div className={classes.error_msg}>
          <span>{errors.username}</span>
        </div>
      )}
      <label htmlFor="Email" className={classes.login_label}>
        {languageWords.EMAIL}

        <input className={classes.input} name="email" onChange={handleInput} />
      </label>
      {errors.email && (
        <div className={classes.error_msg}>
          <span>{errors.email}</span>
        </div>
      )}
      <label htmlFor="Password" className={classes.login_label}>
        {languageWords.PASSWORD}
        <input type="password" className={classes.input} name="password" onChange={handleInput} />
      </label>
      {errors.password && (
        <div className={classes.error_msg}>
          <span>{errors.password}</span>
        </div>
      )}
      <label htmlFor="Confirm password" className={classes.login_label}>
        {languageWords.CONFIRM_PASSWORD}{' '}
        <input type="password" className={classes.input} name="confirmPassword" onChange={handleInput} />
      </label>
      {errors.confirmPassword && (
        <div className={classes.error_msg}>
          <span>{errors.confirmPassword}</span>
        </div>
      )}
      <button type="button" className={classes.login_button} onClick={Submit}>
        {languageWords.SIGN_UP}
      </button>
    </div>
  );
};

export default RegistrationForm;
