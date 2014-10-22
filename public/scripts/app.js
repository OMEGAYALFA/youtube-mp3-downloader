var app = angular.module('mensajesDownloader', ['ngMaterial', 'btford.socket-io'])

app.factory('socket', function (socketFactory) {
  return socketFactory();
});

app.controller('appController', ['$scope', 'socket', function($scope, socket) {
  $scope.currentDownload = {};
  $scope.downloads = [];

  socket.on('connect', function(){
    console.log("Connected!");
  })

  $scope.download = function() {
    //Push to downloads with default data
    var thisDownload = {
      url: $scope.currentDownload.url,
      titulo: $scope.currentDownload.titulo,
      autor: $scope.currentDownload.autor,
      status: "Sending to server...",
      mode: "indeterminate",
      percent: 0
    }
    $scope.currentDownload = {};

    $scope.downloads.push(thisDownload);

    //Send to server
    socket.emit('download', "asdasdasd")

  }
}])
