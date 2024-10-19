import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// se difine la interfaz para manejar la respuesta de la api al iniio de secion 
interface LoginResponse {
  result: boolean; //indica si la session fue exitos
  data?: {
    token: string; // JWT token recibido si authenticacion fue exitosa
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

  //se crea objeto loginOjb para almacenar correo y passwd
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