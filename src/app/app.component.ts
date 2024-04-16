import { Component } from '@angular/core';
import {SistemaService} from './services/sistema.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'administrador';
  showUserProfile = false;

  toggleUserProfile() {
    this.showUserProfile = !this.showUserProfile;
  }
  constructor(private servicio: SistemaService){
  }
  mostrar: boolean= false;

async ngOnInit(){
  this.servicio.menuIn$.subscribe(mostrar => {
    this.mostrar= mostrar;
  })

}

}
