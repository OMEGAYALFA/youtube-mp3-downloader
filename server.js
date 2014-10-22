var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8080);

io.on('connection', function(socket){
  console.log("Connection made!");

  socket.on('download', function(data){
    console.log(data);
  })
})

app.use(express.static(__dirname + '/public'));
console.log("App listening on port 8080");
