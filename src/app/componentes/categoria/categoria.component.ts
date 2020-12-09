import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriaModel } from '../../models/categoria';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  @Output() salida = new EventEmitter();
  categoria: CategoriaModel = new CategoriaModel();
  tabla: any = [];
  idcategoriaActualizar: string;
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService
      .obtenerCategorias()
      .then((data: any) => {
        // console.log(data);
        this.tabla = data.categorias;
        console.log(this.tabla);
      })
      .catch((error) => {
        console.log('pues falló');
      });
  }

  registrar(forma: NgForm) {
    this.categoriaService
      .registarCategoria(this.categoria)
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
    this.categoriaService
      .actualizarCategoria(this.idcategoriaActualizar, this.categoria)
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
    this.idcategoriaActualizar = idUsuario;
    console.log(idUsuario);
  }

  elimiar(idCategoria: string) {
    this.idcategoriaActualizar = idCategoria;
    console.log(idCategoria);
    this.categoriaService
      .eliminarCategoria(idCategoria)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }
}
