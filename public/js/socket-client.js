const user = prompt("What is your name?");

// create local variable of hands 
let hands;

export class SocketClient{

    constructor(manyHands){
        hands = manyHands;
        this.input();
        this.output();
    }

    input(){
        // appendMessage('You Joined');
       hands.socket.emit('new-user', user);

        // messageForm.addEventListener("submit", e =>{
        // // remove page refresh on submit
        // e.preventDefault();

        // const message = messageInput.value;
        
        // // send chat message to SOCKET.
        // // 1. Key "send-chat-message"
        // // 2. Value "message"
        // // 3. Socket does the handling in the backend.
        // hands.socket.emit('send-chat-message', message);

        // // set string to default value after 'submit'
        // messageInput.value = '';
        // });

    }
    output(){
        // grabs the key 'chat-message' from the backend
        // listens for a chat-message response from other sockets
        hands.socket.on('chat-message', data => {
            console.log("message has been passed", `${data.name}: ${data.message}`)
        });

        hands.socket.on('other-camera-values', data => {
            console.log('other camera values', `${data.area}: ${data.xMiddle}: ${data.yMiddle}`);
            // put hand class here. so it draws it out for the other person

            if(`${data.area}` != null){
                hands.draw(`${data.area}`,`${data.xMiddle}`,`${data.yMiddle}`, "them");
            }
            
        });

        hands.socket.on('user-connected', user =>{
            console.log('person-connected', user);
            document.getElementById("user").innerHTML = user + " has entered the room!";
        });

    }
    
}
