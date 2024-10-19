import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

//componente para hacer llamada GET al servidor y obtener todos los usuarios solo si el token ingresado es correcto

export class DashboardComponent {
  //guarda los usuarios en array users
  users: any[]=[];

  //injector para utilizar httpclient
  constructor(private http: HttpClient){}

  //funcion para peticion de llamado de usuarios al api
  loadUsers(){
  
    debugger;
    //llamado GET(api), subscripcion, respuesta, 
    this.http.get('/api/User/GetAllUsers').subscribe((res:any)=>{
      this.users = res.data;
    })
  }

}
