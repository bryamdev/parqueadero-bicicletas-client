import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { OcuparComponent } from './components/ocupar/ocupar.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const ROUTES: Routes = [
    { path: 'puestos', component: PuestosComponent },
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'ocupar/:id', component: OcuparComponent},
    { path: 'usuarios/form', component: FormComponent},
    { path: 'usuarios/form/:id', component: FormComponent},
    { path: '', pathMatch: 'full', redirectTo: 'puestos'},
    { path: '**', pathMatch: 'full', redirectTo: 'puestos'}
]