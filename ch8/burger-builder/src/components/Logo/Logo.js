import React from 'react';
import cssClasses from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
  <div className={cssClasses.Logo}>
    {/* <img src="../../assets/images/burger-logo.png"></img> */}
    <img src={burgerLogo} alt="Sunnysj Burger"></img>
  </div>
);

export default logo;