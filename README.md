# Implementación de Recuperacion de Informacion y Rutas en Angular 

Este proyecto fue generado por Angular CLI versión 18.2.5. [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.5.

## Servidor de desarrollo 

Ingresar ng serve para un dev servidor Navega al url indicado o a http://localhost:4200/. La aplicación se cargará automáticamente si hay algún cambio.

## Build

Ingresa `ng build` para crear el proyecto. Los artefactos del build serán guardados en el dist/ directorio.

## Descripción General

Este es un proyecto en Angular en el cual se implementa la autenticación de usuarios utilizando JWT (JSON Web Token). Cuenta con una página de inicio de sesión, cierre de sesión, y rutas protegidas que requieren un token válido para acceder. Se implementó el uso de llamados HTTP a API llamado https://freeapi.miniprojectideas.com/index.html en el cual se creó un usuario. Al crear un usuario, se verificó que el usuario creado tuviera acceso de ingresar utilizando su correo electrónico y contraseña. Se creó el componente de login el cual implementa una página html que muestra una página de ingreso estilizada con css. En el componente login.component.ts se hace el llamado a post para que el usuario pueda ingresar a la página del servidor con sus datos de autenticación. Si estos datos son correctos, se le da un mensaje de que su login fue exitoso y el servidor regresa un token el cual es guardado en el almacenamiento local del browser. Mientras el token esté guardado en el local storage, el usuario puede ingresar a la página dashboard sin tener que ingresar por la página login, puede ir directamente al dashboard. Una vez el usuario cierra la sesión por medio de logOut, se borra el token. Si el usuario trata de ingresar a la ruta /dashboard, ya no puede y se le redirige a la página inicial de /login. 

## Características 
-** Página de Inicio de Sesión**Los usuarios pueden iniciar sesión utilizando su correo electrónico y su contraseña.

-** Utilizacion de HttpClient**: Se implemento el uso de HttpClient para hacer el llamado de HTTP al servidor y se utilizo POST para realizar el ingreso al API https://freeapi.miniprojectideas.com/api/User/Login. 

-** Uso de NgModel**: Se implementó el uso de NgModel en las páginas de html para poder utilizar el objeto de login Obj para usar los datos ingresados en el formulario de html en el componente login.component.ts. El Correo electrónico se guardó en "EmailId" y la contraseña en "Password" del objeto loginObj. 

-** Creación de funciones para uso por la páginas html **: Se crearon diferentes funciones que fueron utilizadas en las páginas html. Los datos recibidos por los formularios se guardaron en los objetos creados. La función de onLogin() se implementa cuando el usuario da clic al botón en la página html del componente login.

-** Implementación de inyectar**: Se crearon diferentes constructores para la inyección de componentes como las de HttpClient al hacer llamados POST al API. Se utilizó Router para la implementación de navegación en diferentes rutas como la de login, dashboard y layout. 

-** Manejo de errores **: Se implementaron diferentes capturas de errores para poder captarlos y ver porque el usuario no podía ingresar. Al hacer una llamada http al API, también se utilizaron los errores proporcionados por el servidor. Por ejemplo si las credenciales eran erróneas, se le notificará al cliente que los datos erran erroneos y que revisara los datos proporcionados. 

-** Guardado de datos en local storage **: Al ingresar los datos correctamente se le notificará al usuario que puede acceder. El servidor da acceso al usuario proporcionando un token JWT. Este token es obtenido al usar el metodo onLogin() y obtener la respuesta y los datos del token en el servidor. Se guardan en el local storage. Mientras el cliente tiene el token disponible, puede ingresar al dashboard. 

-** Autenticación para rutas **: Se implementa el uso de AuthGuard el cual protege las rutas en el programa. El usuario solo puede ingresar a estas rutas si es válida su autenticación. Mientras tiene el token proporcionado guardado en el local storage, puede ingresar al dashboard sin tener que pasar por la página de el login. Una vez el usuario cierre sesión, se borra el token, y el cliente no puede ingresar a la página de dashboard. El usuario es redirigido a la página login. 

-** Llamado Http GET para verificar token **: Para verificar si el token funcionaba, se creo la funcion en el componente de dashboard en el cual hace una peticion de Http al servidor https://freeapi.miniprojectideas.com/api/User/GetAllUsers, en la cual el usuario tiene que estar ingresado y tener el token correcto para poder obtener los todos los usuarios al hacer la llamada GetAllUsers de la API. 


![Screenshot 2024-10-19 at 1 15 43 PM](https://github.com/user-attachments/assets/386b5d81-91da-462b-8a67-8314ed9042f6)
![Screenshot 2024-10-19 at 1 16 27 PM](https://github.com/user-attachments/assets/d20f94a4-e1f5-483b-b0cf-75668678f872)

** Código de ejemplo
** login.component.ts **

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// se difine la interfaz para manejar la respuesta de la api al iniio de sesión 
interface LoginResponse {
  result: boolean; //indica si la sesión fue exitos
  data?: {
    token: string; // JWT token recibido si authentication fue exitosa
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  //se crea objeto loginOv para almacenar correo y passwd
  loginObj = {
    EmailId: "",
    Password: ""
  };
  
  //constructor para injectar httpClient y sus llamadas y router para navegacion de rutas 
  constructor(private http: HttpClient, private router: Router) {}

  //funcion que se usa al presionar botton de login
  onLogin() {
    //si no hay datos, mensaje de alerta si campos vacios al presionar login
    if (!this.loginObj.EmailId || !this.loginObj.Password) {
      alert("Please fill in both email and password.");
      return;
    }
    
    // se envia peticion POST al servidor con credenciales del usuario.
    this.http.post<LoginResponse>("/api/User/Login", this.loginObj).subscribe(
      (res) => {
        //si la autenticacion correcta, 
        if (res?.result) {
          alert("Login Successful");
          //el token que servidor proporciona se guarda en localStorage
          localStorage.setItem("loginToken", res.data?.token || ''); // guardar la respuesta, el dato llamado token
          // si autenticado, puede navegar al la ruta /dashboard
          this.router.navigateByUrl("dashboard");

        } else {
          //no ingreso correctamente
          alert("Check User Name or Password");
        }
      },
      //captor de errores
      (error) => {
        console.error("Error during login", error);
        if (error.error instanceof ErrorEvent) {
          // si error en lado del cliente 
          console.error("Client-side error:", error.error.message);
        } else {
          // mensaje de error del serividor
          console.error(`Server-side error: ${error.status} - ${error.message}`);
        }
        alert("An error occurred during login. Check the console for more details.");
      }
    );
  }
}

** Codigo de ejemplo 
** layout.component.ts **

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  //se implementa Router par trabajar con rutas
constructor(private router: Router){}

onLogout(){
  //se limpia la session local al presionar logout, quitando el token (localStorage, session storage)
  localStorage.removeItem('loginToken');

  //se redirige a la pagina de login
  this.router.navigate(['/login']);
}

}

** Codigo de ejemplo 
** auth.guard.ts  **
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



## Estructura de Proyecto 

* /src /app /guard # Este es el archivo de auth.guard.ts que incluye la verificacion si el token JWT esta en el local storage. Si no está, se redirige el usuario a la página de login. 

* /src /app /pages/login # Este es el archivo que contiene el componente inicial de login. Contiene la página con el formulario de html y css. 

* /src /app /pages/layout# Este es el archivo que contiene el componente de layout el cual es mostrado sólo si el usuario ingresa correctamente sus datos en la página login. Aquí puede salir de cession. 

* /src /app /pages/dashboard # Esta es la ruta que es permitida si el usuario ingresa correctamente los datos. Se implementó el uso de un template para simular un ingreso a un perfil de un usuario. 
