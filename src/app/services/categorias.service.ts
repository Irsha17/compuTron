import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  setNewCategoria = async(newCategoria : Categoria) => {
    try{
      const url = `http://localhost:3000/categorias`;
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategoria)
      })
      return this.getCantidadCategorias();
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  editarCategoria = async(categoria : Categoria) => {
    try{
      const url = `http://localhost:3000/categorias/${categoria.getId()}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
      })
    }
    catch(error) {
      console.error('Error:', error);
    }
  }

  getCategorias = async() => {
    const url = `http://localhost:3000/categorias`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.map((estadoPedido : any) => new Categoria(estadoPedido.id,estadoPedido.valor));
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
  }

  getCantidadCategorias = async() => {
    const url = `http://localhost:3000/categorias`;
      try {
          const respuesta = await fetch(url);
          const datos = await respuesta.json();
          return datos.length + 1;
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
    return 0;
  }
}
