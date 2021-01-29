import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado.model';
import { Puesto } from 'src/app/models/puesto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PuestosService } from 'src/app/services/puestos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-ocupar',
  templateUrl: './ocupar.component.html',
  styleUrls: ['./ocupar.component.css']
})
export class OcuparComponent implements OnInit {

  public puesto: Puesto = new Puesto;
  public cargando: boolean;

  constructor( private puestosService: PuestosService,
               private actRoute: ActivatedRoute,
               private router: Router,
               private usuariosService: UsuariosService) { 
    
    this.cargando = false;
    
    this.puesto.usuario = new Usuario();
    this.puesto.estado = new Estado();
    

    let id = this.actRoute.snapshot.params['id'];
    
    this.puestosService.getPuestoById(id)
      .subscribe( data =>  {
        if(!data.result.usuario){
          this.puesto = data.result;
          this.puesto.usuario = new Usuario();
          return;  
        }
        this.puesto = data.result;
        console.log(this.puesto);
      }, err => {
        console.log(err.error);
        swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err.error.error,
        })
        this.router.navigate(['/puestos']);
      });

    console.log(id);
    
  }

  ngOnInit(): void {
  }

  buscarUsuario(){
    console.log("codigo: " + this.puesto.usuario.codigo);

    if(!this.puesto.usuario.codigo){
      return
    }

    if(!this.puesto.usuario){
      this.puesto.usuario = new Usuario();
    }

    this.usuariosService.getByCodigo(this.puesto.usuario.codigo)
      .subscribe( data =>{
        console.log(data);

        if(!data.isOk){
          
          swal.fire({
            title: 'Error',
            text: data.error,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Desea crear uno?'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/usuarios']);
            }
          })
          return;
        }

        this.puesto.usuario = data.result;
        console.log(this.puesto.usuario);

        swal.fire({
          icon: 'success',
          title: `Usuario '${data.result.nombre}' encontrado!`,
          showConfirmButton: false,
          timer: 1500
        })
      }, error =>{
        console.log(error);
      });

  }

  guardar(){

    if(!this.puesto.usuario.id){
      swal.fire({
        icon: 'error',
        title: `Porfavor asigne un usuario`,
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    this.puesto.horaEntrada = new Date();
    this.puesto.estado.id = 2;
    
    console.log(this.puesto);

    this.puestosService.updatePuesto(this.puesto)
      .subscribe( data => {
        console.log(data);
        swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/puestos']);
      }, error => { 
        console.log(error);
        swal.fire({
          icon: 'success',
          title: error.error.error,
          showConfirmButton: false,
          timer: 2000
        })
      });

  }

}
