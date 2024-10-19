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
