import { Routes } from '@angular/router';
import { PuestosComponent } from './components/puestos/puestos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const ROUTES: Routes = [
    { path: 'puestos', component: PuestosComponent },
    { path: 'usuarios', component: UsuariosComponent},
    { path: '', pathMatch: 'full', redirectTo: 'puestos'},
    { path: '**', pathMatch: 'full', redirectTo: 'puestos'}
]