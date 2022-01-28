import React, {MouseEventHandler, useCallback, useState} from 'react';
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import {useDispatch} from 'react-redux';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SocialNetworks from './components/SocialNetworks';
import {validateLogin} from '../../helpers/Validation';
import {saveUser, signIn} from './actions/usersActions';
import classes from './LoginContainerStyle.module.css';
import axiosConfig from '../../axiosConfig';
import {SIGN_IN, SIGN_UP} from '../../helpers/axiosRoutes.ts/userRoutes';

const LoginContainer = (): JSX.Element => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    const validationErrors = validateLogin(user, isLogin);
    const isValid = Object.values(validationErrors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors({
        email: validationErrors.email,
        username: validationErrors.username,
        password: validationErrors.password,
        confirmPassword: validationErrors.confirmPassword
      });
      return;
    }
    localStorage.removeItem('jwt');

    const loggedUser = await axiosConfig.post(`${SIGN_IN}`, user);

    if (loggedUser.data.user) {
      dispatch(signIn(loggedUser.data));
      window.location.pathname = '/';
      setErrors({email: '', password: '', confirmPassword: '', username: ''});
    } else {
      setErrors({
        email: '',
        username: '',
        password: loggedUser.data.errorMSG,
        confirmPassword: ''
      });
    }
  };
  const handleRegister = async () => {
    const validationErrors = validateLogin(user, isLogin);
    const isValid = Object.values(validationErrors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors({
        email: validationErrors.email,
        username: validationErrors.username,
        password: validationErrors.password,
        confirmPassword: validationErrors.confirmPassword
      });
      return;
    }
    localStorage.removeItem('jwt');

    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      type: 'user',
      currency: 'BGN'
    };
    try {
      const signUp = await axiosConfig.post(`${SIGN_UP}`, newUser);

      if (signUp.data.user) {
        dispatch(saveUser(signUp.data));
        window.location.pathname = '/';
        setErrors({email: '', password: '', confirmPassword: '', username: ''});
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e);
    }
  };

  const changeTab: (event: boolean) => MouseEventHandler<HTMLLIElement> = useCallback(
    (event: boolean) => () => {
      setUser({email: '', password: '', confirmPassword: '', username: ''});
      setErrors({email: '', password: '', confirmPassword: '', username: ''});
      setIsLogin(event);
    },
    []
  );
  return (
    <div className={classes.container}>
      <div className={classes.login_form}>
        <Tabs selectedTabClassName={classes.selected_tab}>
          <TabList className={classes.tab_list}>
            <Tab className={classes.tab} onClick={changeTab(true)}>
              Sign In
            </Tab>
            <Tab className={classes.tab} onClick={changeTab(false)}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanel>
            <LoginForm Submit={handleLogin} errors={errors} handleInput={handleInputChange} />
          </TabPanel>
          <TabPanel>
            <RegistrationForm Submit={handleRegister} errors={errors} handleInput={handleInputChange} />
          </TabPanel>
        </Tabs>
        <SocialNetworks />
      </div>
    </div>
  );
};
export default LoginContainer;
