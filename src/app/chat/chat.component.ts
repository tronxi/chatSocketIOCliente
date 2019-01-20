import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService} from '../../websocket-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ioConnection: any;
  mensajeTexto: string;
  mensajes: string;
  constructor(private wsc: WebsocketServiceService) { }

  ngOnInit() {
    this.mensajes = '';
    this.initConnection();

  }

  private initConnection(): void {
    this.wsc.initSocket();

    this.ioConnection = this.wsc.onMessage()
      .subscribe((message) => {
        console.log(message);
        this.mensajes += message;
      });

    this.wsc.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });

    this.wsc.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(): void {
    this.wsc.send(this.mensajeTexto);
    this.mensajeTexto = '';
  }


}
