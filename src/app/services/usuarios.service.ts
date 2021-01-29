import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseServer } from '../models/response-server.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endPointPuestos: string = "http://localhost:8080/api/v1/usuarios";
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { 

  }

  public getUsuarios(){

    return this.http.get(`${this.endPointPuestos}/listar`)
      .pipe( map( data => {
        let usuarios = data as ResponseServer;
        return usuarios;
      }))
  }

  public getUsuarioById(id: number){

    return this.http.get(`${this.endPointPuestos}/porId/${id}`)
      .pipe( map( data => {
        let usuario = data as ResponseServer;
        return usuario;
      }))
  }

  public getByCodigo(codigo: string){

    return this.http.get(`${this.endPointPuestos}/porCodigo/${codigo}`)
      .pipe( map( data => {
        let usuario = data as ResponseServer;
        return usuario;
      }))
  }

  public saveUsuario(usuario: Usuario){

    return this.http.post(`${this.endPointPuestos}/crear`, usuario, {headers:this.headers})
      .pipe( map( data => {
        let usuario = data as ResponseServer;
        return usuario;
      }));
  }

  public updateUsuario(usuario: Usuario){

    return this.http.put(`${this.endPointPuestos}/actualizar/${usuario.id}`, usuario, {headers:this.headers})
      .pipe( map( data => {
        let usuario = data as ResponseServer;
        return usuario;
      }));

  }


}
