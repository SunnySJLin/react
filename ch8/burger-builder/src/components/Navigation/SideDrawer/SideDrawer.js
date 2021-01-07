import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.css';

const sideDrawer = () => {
  return(
    <div className={cssClasses.SideDrawer}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}

export default sideDrawer;