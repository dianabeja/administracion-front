import { Component } from '@angular/core';
import { ConectionService } from 'src/app/services/conection.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(private conection: ConectionService) {}
  especialidades = [];

  async especialidad() {
    let a : any= await this.conection.especialidades().toPromise();
    this.especialidades= a;
    console.log(a[0].nombre);
  }
}
