var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;

var youtube_dl = {
  download_mp3: function(url, path) {
    console.log('Download mp3 gets executed')
    command = 'youtube-dl';
    args = ['--extract-audio', '--audio-format', 'mp3', '-o \'' + path + '\'', url];
    var proc = spawn(command, args);
    proc.on('data', function(data) {
      var response = data.toString().trim();
    })
  }
}

var download = function(url, path) {
  var downloadRegex = /\[download\]\s{1,3}(\d{1,3}\.\d)% of .* at (.*) ETA (\d{2}:\d{2})/;
  var eventEmmiter = new EventEmitter();
  command = 'youtube-dl';
  args = ['--extract-audio', '--audio-format', 'mp3', '-o \'' + path + '\'', url];
  var proc = spawn(command, args);
  proc.stdout.on('data', function(data) {
    var response = data.toString().trim();

    if (response.indexOf('[youtube]') != -1) {
      // Preprocessing
      var data = {
        'status': 'preprocessing',
        'details': response.slice(10)
      }
      eventEmmiter.emit('data', data)
    } else if (downloadRegex.test(response)) {
      // Downloading
      var info = downloadRegex.exec(response);
      var data = {
        'status': 'downloading',
        'details': {
          'percent': info[1],
          'speed': info[2],
          'ETA': info[3]
        }
      }
      eventEmmiter.emit('data', data);
    } else if (response.indexOf('[ffmpeg]') != -1) {
      //Postprocessing
      var data = {
        'status': 'postprocessing',
        'details': 'Converting to MP3'
      }
      eventEmmiter.emit('data', data);
    }

  })
  return eventEmmiter;
}

module.exports = download;
