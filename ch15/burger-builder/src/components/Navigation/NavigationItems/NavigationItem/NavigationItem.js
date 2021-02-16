import React from 'react';
import { NavLink } from 'react-router-dom';

import cssClasses from './NavigationItem.css';

const navigationItem = (props) => (
  <li className={cssClasses.NavigationItem}>
    <NavLink 
      to={props.link}
      exact={props.exact}
      activeClassName={cssClasses.active}>
        {props.children}
    </NavLink>
  </li>
);

export default navigationItem;