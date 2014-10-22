var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var download = require('./youtube-dl');
var fs = require('fs');
var pathutils = require('path');

var download_path = '/home/pablo/downloads/'

http.listen(8080);

io.on('connection', function(socket){


  socket.on('download', function(data){

    // Generate download path
    var path = pathutils.join(download_path, data.autor, data.titulo) + '.%(ext)s';
    console.log(path)


    // Download
    var downloading = download(data['url'], path);


    downloading.on('data', function(data) {

        socket.emit('statusUpdate', data);
    })

    downloading.on('end', function(data) {

      socket.emit('statusUpdate', data);
    })

  })
})

app.use(express.static(__dirname + '/public'));
