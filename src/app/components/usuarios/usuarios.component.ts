import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService) { 

    this.usuariosService.getUsuarios()
      .subscribe( data => {
        this.usuarios = data['results'];
        //console.log(data);
        console.log(this.usuarios);
      })


  }

  ngOnInit(): void {
  }

}
