var app = angular.module('mensajesDownloader', [
  'ngMaterial',
  'btford.socket-io'
])

app.factory('socket', function (socketFactory) {
  return socketFactory();
});

app.controller('appController', ['$scope', 'socket', function($scope, socket) {
  $scope.currentDownload = {};
  $scope.downloads = [];

  socket.on('connect', function(){

  })

  socket.on('statusUpdate', function(data){


    $scope.$apply(function() {

    //Buscar la descarga a la que pertenece el evento en downloads[]
    for (var i = 0; i < $scope.downloads.length; i++) {

      if ($scope.downloads[i].url == data['url']) {



        if (data['status'] == 'preprocessing') {
          $scope.downloads[i].status = data['details'];

        } else if (data['status'] == 'downloading') {
          $scope.downloads[i].status = "Downloading";
          $scope.downloads[i].mode = "determinate";
          $scope.downloads[i].percent = Number(data.details.percent);

        } else if (data['status'] == 'postprocessing') {
          $scope.downloads[i].status = data.details;
          $scope.downloads[i].mode = "indeterminate";

        } else if (data['status'] == 'complete') {
          $scope.downloads[i].status = "Complete";
          $scope.downloads[i].mode = "determinate";
          $scope.downloads[i].percent = 100;
        }

      }
    }
  })
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
    socket.emit('download', thisDownload);

  }
}])
