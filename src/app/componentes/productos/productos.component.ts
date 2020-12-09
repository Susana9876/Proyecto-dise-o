import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';
import { ProductosModel } from '../../models/productos';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @Output() salida = new EventEmitter();
  productos: ProductosModel = new ProductosModel();
  tabla: any = [];
  idProductosActualizar: string;


  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService
      .obtenerProductos()
      .then((data: any) => {
        this.tabla = data.productos;
        console.log(this.tabla);
      })
      .catch((error) => {
        console.log('pues falló');
      });
  }

  registrar(forma: NgForm) {
    this.productosService
      .registarProducto(this.productos)
      .then((productos: any) => {
        Toast.fire(productos.msg, '', 'success');
        forma.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console, '', 'error');
      });
  }
  actualizar(forma: NgForm) {
    this.productosService
      .actualizarProducto(this.idProductosActualizar, this.productos)
      .then((productos: any) => {
        Toast.fire(productos.msg, '', 'success');
        forma.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }

  dispararActualizar(idUsuario: string) {
    this.idProductosActualizar = idUsuario;
    console.log(idUsuario);
  }
  elimiar(idProducto: string) {
    this.idProductosActualizar = idProducto;
    console.log(idProducto);
    this.productosService
      .eliminarProducto(idProducto)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }

}
