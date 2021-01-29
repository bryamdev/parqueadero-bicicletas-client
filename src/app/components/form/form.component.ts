import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private usuariosService: UsuariosService,
              private actRoute: ActivatedRoute,
              private router: Router) { 
    
    let id = this.actRoute.snapshot.params['id'];

    console.log(id);

    if(id){
      this.usuariosService.getUsuarioById(id)
        .subscribe( data => {
          console.log(data);
          this.usuario = data.result;
        }, err => {
          console.log(err.error);
          swal.fire({
            icon: 'error',
            title: 'Error...',
            text: err.error.error,
          })
          this.router.navigate(['/usuarios']);
        });
    }

  }

  ngOnInit(): void {
  }

  guardar(){

    if(this.usuario.id){
      console.log("Es viejo");
      this.usuariosService.updateUsuario(this.usuario)
        .subscribe( data =>{
          swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/usuarios']);
        }, error =>{
          console.log(error);
          swal.fire({
            icon: 'error',
            title: 'Error...',
            text: error.error.error,
          })
        });
    }else{
      console.log("Es nuevo");
      this.usuariosService.saveUsuario(this.usuario)
      .subscribe( data =>{
        swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/usuarios']);
      }, error =>{
        console.log(error);
        swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.error.error,
        })
      });
    }

  }

}
