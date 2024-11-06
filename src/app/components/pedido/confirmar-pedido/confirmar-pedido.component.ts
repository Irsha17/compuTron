import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-confirmar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './confirmar-pedido.component.html',
  styleUrl: './confirmar-pedido.component.css'
})
export class ConfirmarPedidoComponent implements OnInit{

  precioFinal : number;
  precioEnvio : number;
  pedidoFormulario : FormGroup;
  validacionAlternativa : boolean;

  constructor(private router : RouterService){
    this.precioFinal = 0;
    this.precioEnvio = 10000;
    this.validacionAlternativa = true;
    let respuestaPrecio = localStorage.getItem("totalCarrito");
    if(!respuestaPrecio){
      this.router.irAHome();
    }
    else{
      this.precioFinal = JSON.parse(respuestaPrecio);
      //Obtengo el precioFinal del carrito para seguir el proceso
    }

    this.pedidoFormulario = new FormGroup({
      nombreDireccionUsuario : new FormControl("",[Validators.required,Validators.minLength(3)]),
      numeroDireccionUsuario : new FormControl("",[Validators.required,Validators.minLength(1)]),
      pisoDireccionUsuario : new FormControl("",[]),
      departamentoDireccionUsuario : new FormControl("",[]),
      opcionDireccionAlternativa : new FormControl(false,[]),
      nombreDireccionAlternativa : new FormControl("",[]),
      numeroDireccionAlternativa : new FormControl("",[]),
      pisoDireccionAlternativa : new FormControl("",[]),
      departamentoDireccionAlternativa : new FormControl("",[])
    })
    let respuestaUsuario = localStorage.getItem("usuario");
    if(respuestaUsuario){    
      let usuario = JSON.parse(respuestaUsuario);
      if(usuario){
        // Tiene que cargar la direccion que esta asignada al usuario cuando se hace el registro.
        // Ahora voy a hacer un modelo de prueba para poder seguir el proceso.
        let modeloDireccion = {
          "nombreDireccion" : "luro",
          "numeroDireccion" : 1,
          "pisoDireccion" : null,
          "departamentoDireccion" : null};
        this.pedidoFormulario.get("nombreDireccionUsuario")?.setValue(modeloDireccion.nombreDireccion);
        this.pedidoFormulario.get("numeroDireccionUsuario")?.setValue(modeloDireccion.numeroDireccion);
        if(modeloDireccion.pisoDireccion){
          this.pedidoFormulario.get("pisoDireccionUsuario")?.setValue(modeloDireccion.pisoDireccion);
        }
        if(modeloDireccion.departamentoDireccion){
          this.pedidoFormulario.get("departamentoDireccionUsuario")?.setValue(modeloDireccion.departamentoDireccion);
        }
      }
      else{
        this.router.irALogin();
      }
    }
  }

  ngOnInit(): void {
    this.cambiarDireccionAlternativa();
  }

  cambiarDireccionAlternativa(){
    this.validacionAlternativa = !this.validacionAlternativa;
    if(this.validacionAlternativa === false){
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators(null);
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators(null);
      this.pedidoFormulario.get('pisoDireccionAlternativa')?.disable();
      this.pedidoFormulario.get('departamentoDireccionAlternativa')?.disable();
    }
    else{
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('nombreDireccionAlternativa')?.setValidators([Validators.required]);
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('numeroDireccionAlternativa')?.setValidators([Validators.required]);
      this.pedidoFormulario.get('pisoDireccionAlternativa')?.enable();
      this.pedidoFormulario.get('departamentoDireccionAlternativa')?.enable();
    }
  }

  cargarPedido(){
    if(this.validacionAlternativa){
      let nombreDireccionAlternativa = this.pedidoFormulario.get('nombreDireccionAlternativa');
      let numeroDireccionAlternativa = this.pedidoFormulario.get('numeroDireccionAlternativa');
      if(nombreDireccionAlternativa?.value && numeroDireccionAlternativa?.value){
        let pedidoAlternativo = {
          precioFinal: this.precioFinal + this.precioEnvio,
          nombreDireccion : nombreDireccionAlternativa.value,
          numeroDireccion : numeroDireccionAlternativa.value,
          pisoDireccion : this.pedidoFormulario.get('pisoDireccionAlternativa')?.value,
          departamentoDireccion : this.pedidoFormulario.get('departamentoDireccionAlternativa')?.value
        };
        localStorage.setItem("pedido",JSON.stringify(pedidoAlternativo));
        this.router.irAPagarPedido();
      }
      else{
        alert("Error: Faltan datos de la direccion alternativa");
      }
    }
    else{
      let nombreDireccionUsuario = this.pedidoFormulario.get('nombreDireccionUsuario');
      let numeroDireccionUsuario = this.pedidoFormulario.get('numeroDireccionUsuario');
      if(nombreDireccionUsuario?.value && numeroDireccionUsuario?.value){
        let pedidoUsuario = {
          precioFinal: this.precioFinal + this.precioEnvio,
          nombreDireccion : nombreDireccionUsuario.value,
          numeroDireccion : numeroDireccionUsuario.value,
          pisoDireccion : this.pedidoFormulario.get('pisoDireccionUsuario')?.value,
          departamentoDireccion : this.pedidoFormulario.get('departamentoDireccionUsuario')?.value
        };
        localStorage.setItem("pedido",JSON.stringify(pedidoUsuario));
        this.router.irAPagarPedido();
      }
      else{
        alert("Error: Faltan datos de la direccion usuario");
      }
    }
  }
}
