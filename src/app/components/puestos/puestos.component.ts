import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Puesto } from 'src/app/models/puesto.model';
import { PuestosService } from 'src/app/services/puestos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  
  constructor(private puestosService: PuestosService,
              private router: Router) { 

    this.obtenerPuestos();

  }

  ngOnInit(): void {
  }

  obtenerPuestos(){

    this.libres = 0;
    this.ocupados = 0;

    this.puestosService.getPuestos()
      .subscribe( data => {
        this.puestos = data['results'];
        console.log(this.puestos);
        this.verificarEstado();
    })
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

    swal.fire({
      title: 'Estás seguro?',
      text: `Vas a desocupar el puesto '${puesto.ubicacion}'`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desocupar'
    }).then((result) => {
      if (result.isConfirmed) {
        puesto.estado.id = 1;
        puesto.usuario = null;
        puesto.horaEntrada = null;

        this.puestosService.updatePuesto(puesto)
          .subscribe( data => {
            console.log(data);
            if(data.isOk){
              swal.fire(
                'Desocupado',
                `El puesto '${puesto.ubicacion}' ha sido desocupado`,
                'success'
              )
              this.obtenerPuestos();
            }
          });        
      }
    })


    // this.puestosService.updatePuesto(puesto)
    //   .subscribe( data => {
    //     console.log(data);
    //   });

    //console.log(puesto);
  }

  ocupar(puesto: Puesto){
    this.router.navigate([`/ocupar/${puesto.id}`]);
  }

  alert(){
    swal.fire("Saludos");
  }

}

//1 libre