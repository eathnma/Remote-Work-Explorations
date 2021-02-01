const path = require('path');
const port = 1501;

const app = require('express')();
const express = require('express');

// socket.io code
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static("app"));
app.use('/js',express.static(__dirname + '/js'));

app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.sendFile('/views/index.html',{ root: __dirname });
})

const users = {};

//socket data handling
io.on('connection', socket => {
  //new-user returns the user that joined the room
  socket.on('new-user', user =>{
    users[socket.id] = user
    socket.broadcast.emit('user-connected', user);
    
    console.log(users)
    console.log(io.engine.clientsCount, io.eio.clientsCount)
  });

  //send-chat-message is where the user clicks the submit button
  socket.on('send-chat-message', message => {
    // socket.broadcast.emit sends values to everybody but
    // the person who sent the request. 
    console.log("backend", message);

    // chat message returns name & message 
    socket.broadcast.emit('chat-message', { 
      message: message, 
      user: users[socket.id] 
    });  
  }); 

  // grabs camera values from user
  socket.on('camera-values', values =>{
    //constantly prints area, x , y coordinates
    console.log(values);

    //returns camera values to second client
    //socket.broadcast.emit sends to all clients except sender
    socket.broadcast.emit('other-camera-values', {
      area: values.area,
      xMiddle: values.xMiddle,
      yMiddle: values.yMiddle
    });

  });

  // logs that a user has been disconnected
  socket.on('disconnect', () => {
    // grabs the user that disconnected
    // grabs the id of the socket user & deletes it from 
    // the object list 'users'
    console.info('user disconnected (id=' + users[socket.id] + ').');
      delete users[socket.id];
  });

});


//heroku deployment
http.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
