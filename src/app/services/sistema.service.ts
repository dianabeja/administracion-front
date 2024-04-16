import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

private menuInSubject = new Subject<any>();
menuIn$ = this.menuInSubject.asObservable();


Actualizar_Menu (menuIniciar : boolean){
  this.menuInSubject.next(menuIniciar);
}
  constructor() { }
}
