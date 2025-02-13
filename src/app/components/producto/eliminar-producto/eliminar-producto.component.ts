import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css'
})
export class EliminarProductoComponent implements OnInit{
  @Input("id") idProducto!: string;
  categorias : [];

  producto : Producto;

  constructor(private productoService : ProductosService,private router: RouterService,private categoriaService : CategoriasService){
    this.producto = new Producto("","","","","",0,0,"");
    this.categorias = [];
  }

  ngOnInit(): void {
    if(this.idProducto){
      this.productoService.consultarCodigo(this.idProducto).then((respuestaProducto) => this.producto = respuestaProducto[0]);
      this.categoriaService.getCategorias().then((respuestaCategorias) => this.categorias = respuestaCategorias);
    }
  }

  buscarCategoria (idCategoria : string){
    let categoria : any= this.categorias.find((busquedaCategoria : any) => busquedaCategoria.id === idCategoria);
    if(categoria){
      return categoria.valor;
    }
    return null;
  }

  volverAlInicio () {
    this.router.irAHome();
  }

  eliminarProducto (producto : Producto) {
    producto.setEliminado(true);
    this.productoService.editarProducto(producto);
    this.router.irAHome();
  }
}
