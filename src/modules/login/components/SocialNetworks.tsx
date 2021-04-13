import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faApple, faFacebookF, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';
import LoginContainerStyle from '../LoginContainerStyle.module.css';

const SocialNetworks = (): JSX.Element => {
  return (
    <div className={LoginContainerStyle.social_container}>
      <FontAwesomeIcon className={LoginContainerStyle.social_icon} icon={faFacebookF} />
      <FontAwesomeIcon className={LoginContainerStyle.social_icon} icon={faGoogle} />
      <FontAwesomeIcon className={LoginContainerStyle.social_icon} icon={faTwitter} />
      <FontAwesomeIcon className={LoginContainerStyle.social_icon} icon={faApple} />
    </div>
  );
};

export default SocialNetworks;
