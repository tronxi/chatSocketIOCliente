import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  private socket;
  constructor() { }

  public initSocket(): void {
    this.socket = io('http://raspberrytronxi.ddns.net',  {path: '/chatSocketIOServer_socket'});
  }

  public send(message): void {
    this.socket.emit('new-message', message);
  }

  public unirse(sala): void {
    this.socket.emit('union', sala);
  }

  public salir(sala): void {
    this.socket.emit('salir', sala);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  public onEvent(event): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
