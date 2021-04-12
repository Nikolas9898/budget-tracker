import React, {useState} from 'react';
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SocialNetworks from './components/SocialNetworks';
import {validateLogin} from '../../helpers/Validation';
import {singIn} from './actions/usersActions';
import style from './LoginContainerStyle.module.css';

const LoginContainer = (): JSX.Element => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
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

  // const handleEnterPress = (event: any) => {
  // };
  const handleLogin = async () => {
    const validationErrors = validateLogin(user, isLogin);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors({
        email: validationErrors.email,
        password: validationErrors.password,
        confirmPassword: validationErrors.confirmPassword
      });
      return;
    }
    localStorage.removeItem('jwt');
    const loggedUser = await axios.post(`http://localhost:5000/signIn`, user);

    if (loggedUser.data.user) {
      dispatch(singIn(loggedUser.data));
      window.location.pathname = '/';
      await setErrors({email: '', password: '', confirmPassword: ''});
    } else {
      setErrors({
        email: '',
        password: loggedUser.data.errorMSG,
        confirmPassword: ''
      });
    }
  };
  const handleRegister = async () => {
    const validationErrors = validateLogin(user, isLogin);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors({
        email: validationErrors.email,
        password: validationErrors.password,
        confirmPassword: validationErrors.confirmPassword
      });
      return;
    }
    localStorage.removeItem('jwt');

    const newUser = {
      username: user.email,
      email: user.email,
      password: user.password,
      type: 'admin',
      currency: 'BG'
    };
    try {
      const signUp = await axios.post(`http://localhost:5000/signUp`, newUser);

      if (signUp.data.user) {
        dispatch(singIn(signUp.data));
        window.location.pathname = '/';
        setErrors({email: '', password: '', confirmPassword: ''});
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.login_form}>
        <Tabs selectedTabClassName={style.selected_tab}>
          <TabList className={style.tab_list}>
            <Tab
              className={style.tab}
              onClick={() => {
                setUser({email: '', password: '', confirmPassword: ''});
                setErrors({email: '', password: '', confirmPassword: ''});
                setIsLogin(true);
              }}
            >
              Sign In
            </Tab>
            <Tab
              className={style.tab}
              onClick={() => {
                setUser({email: '', password: '', confirmPassword: ''});
                setErrors({email: '', password: '', confirmPassword: ''});
                setIsLogin(false);
              }}
            >
              Register
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
