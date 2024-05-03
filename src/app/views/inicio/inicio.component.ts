import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignosService } from 'src/app/services/signos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  habitaciones = [
    {
      titulo: 'Habitación 1',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 2',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 3',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 4',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 5',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 1',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 2',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 3',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 4',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 5',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 1',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
    {
      titulo: 'Habitación 2',
      temperatura: { valor: 0 }, 
      oxigeno: 120,
      presion: 120,
      ritmoCardiaco: 50,
    },
  ];

  private mqttSubscription: Subscription | undefined;

  constructor(private mqttService: SignosService) { }

  ngOnInit(): void {
    this.mqttService.initialize('topic/emqx');

    this.mqttSubscription = this.mqttService
      .getReceiveNews()
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        this.habitaciones.forEach((habitacion) => {
          habitacion.temperatura = { valor: parseInt(data) };
        });
      });
  }

  ngOnDestroy(): void {
    this.mqttSubscription?.unsubscribe();
  }
}
