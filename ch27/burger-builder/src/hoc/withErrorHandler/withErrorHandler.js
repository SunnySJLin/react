import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null); // clear any errors
      return req; // request can continue
    });

    const resInterceptor = axios.interceptors.response.use(
      res => res,
      err => {
        setError(err);
      }
    );

    useEffect(() => { // React will run main function content when the component mounts.
      return () => {
        // Return cleanup function to clean up interceptors, when request or response interceptor changes.
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null); //reset
    };

    return (
      <Auxiliary>
        <Modal 
          show={error} 
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}/>
      </Auxiliary>
    );
  };
};

export default withErrorHandler;