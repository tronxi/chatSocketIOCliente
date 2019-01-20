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
    this.socket = io('localhost:5000');
  }

  public send(message): void {
    this.socket.emit('new-message', message);
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
