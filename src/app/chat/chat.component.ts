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
  salaEnviar: string;
  salaUnirse: string;
  salaSalir: string;
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
    let json = JSON.stringify({sala: this.salaEnviar,
                                    mensaje: this.mensajeTexto});
    this.wsc.send(json);
    this.mensajeTexto = '';
  }

  public unirse(): void {
    this.wsc.unirse(this.salaUnirse);
  }

  public salir(): void {
    this.wsc.salir(this.salaSalir);
  }


}
