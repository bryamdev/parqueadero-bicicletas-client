import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseServer } from '../models/response-server.model';

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
        let puestos = data as ResponseServer;
        return puestos;
      }))
  }


}
