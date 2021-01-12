var express = require('express');
var app = express();
var path = require('path');

//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

// current pathing
// /Users/ethan/Desktop/directed study/digital experiments/Remote-Work-Explorations/public

app.use('/js',express.static(__dirname + '/js'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(1500, function(){
  console.log("listening at port 1500")
});
