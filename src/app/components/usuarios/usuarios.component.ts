import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService,
              private router: Router) { 

    this.usuariosService.getUsuarios()
      .subscribe( data => {
        this.usuarios = data['results'];
        //console.log(data);
        console.log(this.usuarios);
      })


  }

  ngOnInit(): void {
  }

  editar(usuario: Usuario){
    this.router.navigate([`/usuarios/form/${usuario.id}`]);
  }

  crear(){
    this.router.navigate([`/usuarios/form`]);
  }

}
