import { useState, useEffect } from 'react';

const useHttpErrorHandler = (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null); // clear any errors
    return req; // request can continue
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => { // React will run main function content when the component mounts.
    return () => {
      // Return cleanup function to clean up interceptors, when request or response interceptor changes.
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null); //reset
  };

  return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;