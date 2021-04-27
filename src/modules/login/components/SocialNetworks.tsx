import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faApple, faFacebookF, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';
import classes from '../LoginContainerStyle.module.css';

const SocialNetworks = (): JSX.Element => {
  return (
    <div className={classes.social_container}>
      <FontAwesomeIcon className={classes.social_icon} icon={faFacebookF} />
      <FontAwesomeIcon className={classes.social_icon} icon={faGoogle} />
      <FontAwesomeIcon className={classes.social_icon} icon={faTwitter} />
      <FontAwesomeIcon className={classes.social_icon} icon={faApple} />
    </div>
  );
};

export default SocialNetworks;
