import React from 'react';
import languageWords from '../../../helpers/LanguageConsts';
import classes from '../LoginContainerStyle.module.css';

type Props = {
  Submit: () => void;

  errors: {
    email: string;
    password: string;
  };
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm: React.FC<Props> = ({Submit, errors, handleInput}) => {
  return (
    <div className={classes.login_content}>
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
      <button type="button" className={classes.login_button} onClick={Submit}>
        {languageWords.SIGN_IN}
      </button>
    </div>
  );
};

export default LoginForm;
