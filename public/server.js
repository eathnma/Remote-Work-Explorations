const path = require('path');
const port = 1500;

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

//socket data handling
io.on('connection', socket => {
  // logs that a user has been conneted
  console.log("a user connected");

  socket.on('send-chat-message', message =>{
    // socket.broadcast.emit sends values to everybody but
    // the person who sent the request. 
    socket.broadcast.emit('chat-message', message);  
  }); 

  // logs that a user has been disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected');    
  });
});







//heroku deployment
http.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
