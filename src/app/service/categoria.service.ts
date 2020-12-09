import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaModel } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  url = `https://equipo4-4a-2do-parcial-awos.herokuapp.com`;

  obtenerCategorias(){
    return this.http.get(`${this.url}/categoria`).toPromise();
  }

  registarCategoria( usuario: CategoriaModel) {
    return this.http.post(`${this.url}/categoria`, usuario).toPromise();
  }

 actualizarCategoria(id: string, usuario: CategoriaModel) {
  return this.http.put(`${this.url}/categoria/${id}`, usuario).toPromise();
 }

 eliminarCategoria(id: string) {
  return this.http.delete(`${this.url}/categoria/${id}`).toPromise();
 }

}
