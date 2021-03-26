import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../../store/actions/index';

const logout = props => {
  const {onLogout} = props;

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.authLogout())
  };
};

export default connect(null, mapDispatchToProps)(logout);