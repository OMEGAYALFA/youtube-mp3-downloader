var spawn = require('child_process').spawn;

var youtube_dl = {
    download_mp3: function (url, path) {
        console.log('Download mp3 gets executed')
        command = 'youtube-dl';
        args = ['--extract-audio', '--audio-format', 'mp3', '-o \'' + path + '\'', url];
        var proc = spawn(command, args);
        return proc.stdout;
    }
}

module.exports = youtube_dl;
