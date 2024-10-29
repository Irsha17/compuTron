import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterService } from '../../../services/router.service';
import { AuthService } from '../../../services/auth.service';
import { ContadorCarritoComponent } from '../../carrito/contador-carrito/contador-carrito.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,ContadorCarritoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  titulo = "Computron";

  constructor(private authService: AuthService,private router : RouterService){}

  cerrarSesion () {
    this.authService.logout();
    this.router.irALogin();
  }
}
