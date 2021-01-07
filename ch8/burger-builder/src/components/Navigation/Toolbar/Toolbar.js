import React from 'react';
import cssClasses from './Toolbar.css';

const toolbar = (props) => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>
      ...
    </nav>
  </header>
);

export default toolbar;