// by passing in "localhost:1500 through the socket object,
// it links the front & backend together.
var socket = io('http://localhost:1500');

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", e =>{
    // remove page refresh on submit
    e.preventDefault();

    const message = messageInput.value;
    
    // send chat message to SOCKET.
    // 1. Key "send-chat-message"
    // 2. Value "message"
    // 3. Socket does the handling in the backend.
    socket.emit('send-chat-message', message);

    // set string to default value after 'submit'
    messageInput.value = '';
});

// grabs the key 'chat-message' from the backend
// listens for a chat-message response from other sockets
socket.on('chat-message', data => {
    console.log("message has been passed", data );
});

function appendMessage(message){
    const messageElemnt = doucment.createElement('div');
    messageElement.innerText = message; 
    messageContainer.append(messageElement);
}