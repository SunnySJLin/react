import React from 'react';

const withClass = props => (
  <div className={props.cssClass}>
    {props.children}
  </div>
);

export default withClass;