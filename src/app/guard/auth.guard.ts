import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export const authGuard: CanActivateFn = (route, state) => {

    //usar injeccion de rauter con estilo en angular 18
    const router =inject(Router);
debugger;
  //ver el lacal storage para obtener el loginToken
  const localData = localStorage.getItem("loginToken");
  //si el token esta disponible, ingresa true, permite navegar a dashboard automaticamente sin login otra vez
  if(localData != null){
    return true;
  }else{
router.navigateByUrl("login");//Si no esta el token disponible en localStorage, redirecta a pagina de login
return false;
  }
};


//Una vez creada usarse en rutas app.routes.js