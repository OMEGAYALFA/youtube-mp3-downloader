var youtube_dl = require('./youtube-dl');

var download = youtube_dl.download_mp3('https://www.youtube.com/watch?v=nVhSCVVz5rI', 'Esperanza.mp3');

download.on('data', function(data) {
    console.log("New data: ", data.toString())
})
