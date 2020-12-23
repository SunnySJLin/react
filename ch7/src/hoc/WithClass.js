import React from 'react';

const withClass = (WrappedComponent, cssClass) => {
  return props => (   
    <div className={cssClass}>
      <WrappedComponent {...props}/>
    </div>
  );
  //return a normal function and the function return is a functional component
};

export default withClass;