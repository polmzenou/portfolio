const socket = io();

document.getElementById('send-message').addEventListener('click', function () {
    const message = document.getElementById('chat-input').value;
    socket.emit('sendMessage', message);
    document.getElementById('chat-input').value = '';
});

socket.on('receiveMessage', function (message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
});
