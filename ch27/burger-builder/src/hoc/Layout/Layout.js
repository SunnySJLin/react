import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import cssClasses from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Auxiliary>
      <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer 
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible} 
        closed={sideDrawerClosedHandler}/>
      <main className={cssClasses.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);