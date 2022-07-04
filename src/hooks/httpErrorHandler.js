import { useState, useEffect } from 'react';

export default httpClient => {

   const [error, setError] = useState(null);

   // console.log('[withErrorHandler] componentdidmount');
   const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null);
      return req;
   });

   const resInterceptor = httpClient.interceptors.response.use(
      res => res,
      err => {
         setError(err)
         return Promise.reject(err);
      }
   );

   useEffect(() => {
      // console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
      return () => {
         httpClient.interceptors.request.eject(reqInterceptor);
         httpClient.interceptors.response.eject(resInterceptor);
      }
   }, [reqInterceptor, resInterceptor, httpClient.interceptors.request, httpClient.interceptors.response]);

   const errorConfirmedHandler = () => {
      setError(null);
   };

   return [error, errorConfirmedHandler];
}