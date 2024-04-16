import { Component } from '@angular/core';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent {

  historialIncidencias = [
    {
      horaAlarma: '10:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 1',
      accionesTomadas: 'Acciones 1'
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2'
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2'
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2'
    },
  ];

}
