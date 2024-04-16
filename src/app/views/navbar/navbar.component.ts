import { Component } from '@angular/core';
import {SistemaService} from './../../services/sistema.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private servicio: SistemaService){
  }

  mostrar : boolean = false;

  mostrarMenu(){
    if(this.mostrar== false){
      this.mostrar= true;
      this.servicio.Actualizar_Menu(true);
    } else{
      this.mostrar= false;
      this.servicio.Actualizar_Menu(false);
    }
  }
}
