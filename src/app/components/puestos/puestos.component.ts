import { Component, OnInit } from '@angular/core';
import { Puesto } from 'src/app/models/puesto.model';
import { PuestosService } from 'src/app/services/puestos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  public puestos: Puesto[] = [];
  public libres: number = 0;
  public ocupados: number = 0;
  
  constructor(private puestosService: PuestosService) { 

    this.puestosService.getPuestos()
      .subscribe( data => {
        this.puestos = data['results'];
        console.log(this.puestos);
        this.verificarEstado();
      })

  }

  ngOnInit(): void {
  }

  verificarEstado(){
    
    this.puestos.forEach( puesto =>{
      if(puesto.estado.id === 1){
        this.libres += 1;
      }
      if(puesto.estado.id === 2){
        this.ocupados += 1;
      }
    });

  }

  desocupar(puesto: Puesto){
    puesto.estado.id = 1;
    puesto.usuario = null;
    puesto.horaEntrada = null;

    this.puestosService.updatePuesto(puesto)
      .subscribe( data => {
        console.log(data);
      });

    //console.log(puesto);
  }

  alert(){
    swal.fire("Saludos");
  }

}

//1 libre