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

// process.env.PORT for heroku deployment
http.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


// //setting middleware
// app.use(express.static(__dirname + 'public')); //Serves resources from public folder

// // current pathing
// // /Users/ethan/Desktop/directed study/digital experiments/Remote-Work-Explorations/public

// app.use('/js',express.static(__dirname + '/js'));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.listen(1500, function(){
//   console.log("listening at port 1500")
// });
