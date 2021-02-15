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

        // sets html element to prompt-name 
        document.getElementById("user-name").innerHTML = user;
        console.log(user);

    }
    
}
