import { Component, OnInit } from '@angular/core';
import { SignalRServiceService } from '../service/SignalRService.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../model/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  mensagens: Message[] = [];
  mensagem = '';
  usuario = this.usuarioLogado();
  disableEnviarMensagem: boolean = true;
  constructor(
    private signalRService: SignalRServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usuarioLogado();
    this.signalRService.startConnection();
    this.signalRService.addMessageListener(
      (usuario, message, usuarioDestino) => {
        const novaMensagem = new Message();
        novaMensagem.usuario = usuario;
        novaMensagem.message = message;
        this.toastr.success(`Mensagem nova recebida`, 'ALERTA');

        novaMensagem.usuarioDestino = usuarioDestino;
        this.mensagens.push(novaMensagem);
        console.log(
          `received message: De: ${usuario} - Mensagem: ${message} - Para ${usuarioDestino}`
        );
      }
    );
  }

  enviarMensagem() {
    const destino = document.getElementById('destino') as HTMLSelectElement;
    const mensagem = document.getElementById('mensagem') as HTMLTextAreaElement;

    this.signalRService.enviarMensagem(
      this.usuario,
      mensagem.value,
      destino.value
    );
    mensagem.value = '';
  }
  usuarioLogado() {
    var quotes = new Array('joao', 'pedro', 'lucas', 'samuel');
    var randno = quotes[Math.floor(Math.random() * quotes.length)];
    return randno.toUpperCase();
  }

  onInputKeyUp(event: KeyboardEvent) {
    const texto = (event.target as HTMLTextAreaElement).value;
    debugger;
    if (texto != '' && texto != undefined) {
      debugger;
      this.disableEnviarMensagem = false;
    } else {
      this.disableEnviarMensagem = true;
    }
  }
}
