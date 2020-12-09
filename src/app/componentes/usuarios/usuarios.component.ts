import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { UsuarioModel } from '../../models/usuario';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @Output() salida = new EventEmitter();
  usuario: UsuarioModel = new UsuarioModel();
  tabla: any = [];
  idUsuarioActualizar: string;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit() {
    this.usuarioService
      .obtenerUsuarios()
      .then((data: any) => {
        this.tabla = data.usuarios;
        console.log(this.tabla);
      })
      .catch((error) => {
        console.log('pues falló');
      });
  }

  registrar(forma: NgForm) {
    this.usuarioService
      .registarUsuario(this.usuario)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        forma.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console, '', 'error');
      });
  }

  actualizar(forma: NgForm) {
    this.usuarioService
      .actualizarUsuario(this.idUsuarioActualizar, this.usuario)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        forma.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }

  dispararActualizar(idUsuario: string) {
    this.idUsuarioActualizar = idUsuario;
    console.log(idUsuario);
  }

  elimiar(idUsuario: string) {
    this.idUsuarioActualizar = idUsuario;
    console.log(idUsuario);
    this.usuarioService
      .eliminarUsuario(idUsuario)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }
}
