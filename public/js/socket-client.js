// socket-client is split between two types of code
// INPUT focuses on sending specific types of data to the backend.
// OUTPUT focuses on recieving types of data from the other client
// and displaying it in the front end.

// <--  INPUT  --> 
var socket = io("http://localhost:1500");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const user = prompt("What is your name?");
// appendMessage('You Joined');
socket.emit('new-user', user);

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


// <--  OUTPUT  --> 

// grabs the key 'chat-message' from the backend
// listens for a chat-message response from other sockets
socket.on('chat-message', data => {
    console.log("message has been passed", `${data.name}: ${data.message}`)
});

socket.on('other-camera-values', data => {
    // console.log('other camera values', `${data.area}: ${data.xMiddle}: ${data.yMiddle}`)
    
    // put hand class here. so it draws it out for the other person
    
});

socket.on('user-connected', user =>{
    console.log('person-connected', user);
    // appendMessage()
})



// function appendMessage(message){
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message; 
//     messageContainer.append(messageElement);
// }