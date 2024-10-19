import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
 
  console.log('Request URL: ', req.url);

  // revisar si el token esta en browser local o en localStorage 
  let token = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('loginToken') || '';
  }

  // clonar la petiion y  agregar header de autorizacion con el token
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  debugger;
  // seguir con la peticion
  return next(clonedRequest);
};