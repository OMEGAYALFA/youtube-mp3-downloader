var download = require('./youtube-dl');

var downloading = download('https://www.youtube.com/watch?v=nVhSCVVz5rI', 'Esperanza.mp3');

downloading.on('data', function(data) {
    console.log("New data: ", data)
})
