import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseServer } from '../models/response-server.model';
import { Puesto } from 'src/app/models/puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  private endPointPuestos: string = "http://localhost:8080/api/v1/puestos";
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { 
    console.log("El sercivio esta funcionando!");
  }


  public getPuestos(){

    return this.http.get(`${this.endPointPuestos}/listar`)
      .pipe( map( data => {
        let puestos = data as ResponseServer;
        return puestos;
      }));

  }

  public updatePuesto(puesto: Puesto){
    return this.http.put(`${this.endPointPuestos}/actualizar/${puesto.id}`, puesto, {headers:this.headers})
      .pipe( map( data => {
        let resp = data as ResponseServer;
        return resp;
      }));
  }


}
