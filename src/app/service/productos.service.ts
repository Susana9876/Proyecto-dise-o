import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosModel } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  url = `https://equipo4-4a-2do-parcial-awos.herokuapp.com`;

  obtenerProductos(){
    return this.http.get(`${this.url}/producto`).toPromise();
  }

  registarProducto( usuario: ProductosModel) {
    return this.http.post(`${this.url}/producto`, usuario).toPromise();
  }

 actualizarProducto(id: string, usuario: ProductosModel) {
  return this.http.put(`${this.url}/producto/${id}`, usuario).toPromise();
 }

 eliminarProducto(id: string) {
  return this.http.delete(`${this.url}/producto/${id}`).toPromise();
 }

}
