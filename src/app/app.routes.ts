import { Routes } from '@angular/router'; //importar rutas para poder navegar
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { authGuard } from './guard/auth.guard'; //guardia creado 


//array routes [] guarda las rutas 
export const routes: Routes = [
//creacion de rutas a las differentes paginas(componentes)

{
    //si no hay nada en ruta root, se dirige a la pagina login
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'//tiene que ingresar login 
},
{
    path: 'login',
    component: LoginComponent //pagina inicial
},
{
    path: '',
    component: LayoutComponent, //si el cliente quiere navegar a dashboard, tiene que primero pasar por el layoutComponent
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent,// se hace login al componente de layoutComponent
            canActivate: [authGuard] //se creo un guard folder(ng g g auth), luego anadir aqui para uso
        }
    ]
},
{
    //path de registrarse 
    path: 'signUp',
    component: SignUpComponent
}


];
