
using Microsoft.AspNetCore.SignalR;

namespace Chat
{
    public class ChatPrivate : Hub
    {
        public string GetConnectionId() => Context.ConnectionId;
        public async Task SendMessage(string usuarioLogado, string mensagem, string usuarioDestino, string connectionId)
        {
            await Clients.All.SendAsync("ReceiveMessage", usuarioLogado, mensagem, usuarioDestino, connectionId);
        }
    }
}
