//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Routes
import { ROUTES } from './app.routes'

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

//Pipes
import { NullVerifyPipe } from './pipes/null-verify.pipe';
import { OcuparComponent } from './components/ocupar/ocupar.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PuestosComponent,
    UsuariosComponent,
    NullVerifyPipe,
    OcuparComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
