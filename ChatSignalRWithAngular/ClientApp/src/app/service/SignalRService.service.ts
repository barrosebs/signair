import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SignalRServiceService {
  baseUrl = environment.apiBackEnd + 'chatprivate';
  private hubConnection!: signalR.HubConnection;
  connectionId = sessionStorage.getItem('conectionId');
  startConnection = async () => {
    try {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.baseUrl, { withCredentials: true })
        .build();
      await this.hubConnection.start();
      console.log('Conexão com o SignalR estabelecida.');
      const connectionId = await this.hubConnection.invoke('getConnectionId');
      sessionStorage.setItem('conectionId', connectionId);
    } catch (err) {
      console.error('Erro ao conectar com o SignalR:', err);
    }
  };

  public addMessageListener(
    callback: (
      usuarioLogado: string,
      message: string,
      usuarioDestino: string
    ) => void
  ) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
  // Método para enviar uma mensagem para o servidor SignalR

  enviarMensagem(
    usuarioLogado: string,
    mensagem: string,
    usuarioDestino: string
  ) {
    this.hubConnection
      .invoke(
        'SendMessage',
        usuarioLogado,
        mensagem,
        usuarioDestino,
        this.connectionId
      )
      .catch((err) => console.error('Erro ao enviar mensagem:', err));
  }
  // Métodos para enviar e receber mensagens em tempo real podem ser adicionados aqui.
}
