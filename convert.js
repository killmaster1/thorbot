const { time, info } = require('console');
const { resolve } = require('path');
const ytdl = require('ytdl-core');
const bot = require('./bot')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
const zap = require('whatsapp-web.js');
const webp=require('webp-converter');

ffmpeg.setFfmpegPath(ffmpegPath);
console.log(ffmpeg.path, ffmpeg.version);
var fs = require('fs'),
    cloudconvert = new(require('cloudconvert'))('H4lJOzTJOqdEbd143ubymBzfB3LQmqiNP9lH2zqNyFrf5qmokrJPaX5NCIqnOqT5');

    const sleep = time => new Promise(resolve => {
        setTimeout(resolve, time)
    })

//CORES
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

var data = new Date();

// Guarda cada pedaço em uma variável
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano2    = data.getYear();           // 2 dígitos
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var seg     = data.getSeconds();        // 0-59
var mseg    = data.getMilliseconds();   // 0-999
var tz      = data.getTimezoneOffset(); // em minutos
if(seg < 10){
    var str_seg = '0'+seg
}
else{
    var str_seg = seg
}

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + str_seg;
    
    //MANDAR VIDEO
    async function espa(valor, pessoa){
        var start = Date.now()
        mp4 = 'video.mp4'
        stream = ytdl(valor, {format: 'mp4'})
        var titulo = '';
        var segundos = 0;
        var Delay = 0
        await stream.on('info', async function (info) {
                titulo = await info.videoDetails.title; // titulo
                segundos = await info.videoDetails.lengthSeconds
        proc =  await new ffmpeg({source:stream})
        .audioBitrate('128')
        .audioCodec('libmp3lame')

        .on('end', function() {
            console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}VIDEO ENVIADO`);
            var end = Date.now()
            Delay = (end-start)
            bot.mensagem(pessoa, mp4, titulo, Delay)
          })
        await proc.saveToFile(mp4)
        await sleep(segundos * 200)
        })

    }


    //MANDAR MÚSICAA
    async function esp(valor, pessoa){
        var start = Date.now()
        var Delay = 0
        mp3 = 'audio.mp3'
        stream = ytdl(valor, {quality: 'highestaudio'})
        console.log('1')
        proc =  await new ffmpeg({source:stream})
        .audioBitrate('128')
        .audioCodec('libmp3lame')
        .on('end', function() {
            console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}MÚSICA ENVIADA`);
            var end = Date.now()
            Delay = (end-start)
            bot.mensagem(pessoa, mp3, Delay)
          })
        .on('er', function(){
            console.log('Ocorreu um erro')
        })
        await proc.saveToFile(mp3)
        await sleep(15000)
    }

     //MANDAR gif
     async function gif(nome, pessoa){
        var start = Date.now()
        var Delay = 0
        proc =  await new ffmpeg(nome)
        .audioBitrate('128')
        .audioCodec('libmp3lame')
        .on('end', function() {
            var end = Date.now()
            Delay = (end-start)
            const result = webp.cwebp("./gif.gif","out.webp","-q 80",logging="-v");
                                    result.then(async function (response) {
                                            console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}STICKER ENVIADO COM SUCESSO!`);
                                            bot.figura(pessoa, nome)
                                    })
          })
        .on('er', function(){
            console.log('Ocorreu um erro')
        })
        await proc.saveToFile('gif.gif')
    }
    module.exports = {
        esp,
        espa,
        gif,
    };