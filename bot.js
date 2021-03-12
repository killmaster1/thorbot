const {
    Client,
    Location,
    MessageTypes,
    ChatTypes
} = require('whatsapp-web.js');
const {
    MessageMedia
} = require('whatsapp-web.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = require("request");
const ytdl = require('ytdl-core');
const readline = require('readline');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
var parser = require("xml2json");
console.log(ffmpeg.path, ffmpeg.version);
var fs = require('fs'),
    cloudconvert = new(require('cloudconvert'))('H4lJOzTJOqdEbd143ubymBzfB3LQmqiNP9lH2zqNyFrf5qmokrJPaX5NCIqnOqT5');
const webpBase64Data = 'UklGRlxWAABXRUJQVlA4WAoAAAAQAAAAgAMAFgIAQUxQSFQ0AAAB...';
const webp = require('webp-converter');
const fetch = require('node-fetch');
const gTTS = require('gtts');  


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


const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
        puppeteer: {
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
        },
        ignoreDefaultArgs: true,
        args: [
            "--disable-web-security",
            "--user-data-dir",
            "--enable-usermedia-screen-capturing",
            "--allow-http-screen-capture",
            "--start-fullscreen",
            "--kiosk",
            "--disable-infobars"
        ],
        session: sessionCfg
    }

);
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

// client.initialize();

// client.on('qr', (qr) => {
//     // NOTE: This event will not be fired if a session is specified.
//     console.log('QR RECEIVED', qr);
// });

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
    console.log("WhatsApp Web v", await client.getWWebVersion());
    console.log("WWebJS v", require("whatsapp-web.js").version);
});


function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

client.on('group_update', function(att) {

})
client.on('group_join', async function(entrou) {
    client.sendMessage(entrou.id.remote, '*Seja bem vindo(a), leia as regras.*');
})
client.on('group_leave', async function(saiu) {
    console.log(saiu);
    let contact = saiu.recipientIds[0].split('@c.us');
    console.log(contact);
    let adm = saiu.author.split('@c.us');
    let ps = saiu.id;
    console.log(`*Usuário: ${contact} banido por: ${adm}*`);
    if (saiu.type == 'remove') {
        var chat = await saiu.getChat()
        client.sendMessage(saiu.id.remote,`*Usuário: ${contact} banido por: ${adm}*`)
    } else {
        client.sendMessage(saiu.id.remote, '*-1 corno no grupo*');
    }
})

//adiciona mascara ao telefone
function mascara(telefone){
    const textoAtual = telefone.toString();
    const isCelular = textoAtual.length === 13;
    let textoAjustado;
        if(isCelular) {
            const parte1 = textoAtual.slice(0,2); //DD 
            const parte2 = textoAtual.slice(2,4); //DDD
            const parte3 = textoAtual.slice(4,9); //1 A 4
            const parte4 = textoAtual.slice(9,13); // 5 A 8
            textoAjustado = `+${parte1} (${parte2}) ${parte3}-${parte4}`
        } else {
            const parte1 = textoAtual.slice(0,2); //DD 
            const parte2 = textoAtual.slice(2,4); //DDD
            const parte3 = textoAtual.slice(4,8); //1 A 4
            const parte4 = textoAtual.slice(8,12); // 5 A 8
            textoAjustado = `+${parte1} (${parte2}) ${parte3}-${parte4}`
        }
    return textoAjustado;
}

client.on('message', async function(msg) {
    // Obtém a data/hora atual
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

// Mostra o infoado
    mn = msg.body.split(' ');
    const mentions = await msg.getMentions();
    const user = await msg.getContact();
    console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgMagenta} [ CHAT ] ${FgRed}${user.pushname}${FgWhite} (${FgBlue}${mascara(user.id.user)}${FgWhite})${FgYellow}: ${FgGreen}${msg.body}${FgWhite}`);

    function Seconds(millis) {
        if (millis >= 60000) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutos`;
        } else {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} segundos`;
        }
    }

    async function esp() {
        const chat = await msg.getChat();
        const teste = require('./convert');
        console.log(mn[1])
        teste.esp(mn[1], chat);
    }

    async function espa() {
        const teste = require('./convert');
        const chat = await msg.getChat();
        teste.espa(mn[1], chat);
    }

    async function pegarmsg() {
        const chat = await msg.getChat();
        return console.log(chat);
    }
    async function figura(pessoa, nome) {
        console.log(pessoa)
        console.log(nome)
        const Media = MessageMedia.fromFilePath(nome)
        pessoa.sendMessage(Media, {
            sendMediaAsSticker: true
        })
    }
    async function mensagem(pessoa, tipo, titulo, Delay) {
        const media = MessageMedia.fromFilePath(tipo);
        pessoa.sendMessage(media, {
            caption: `Titulo: *${titulo}*
            
Tempo de conversão: ${Seconds(Delay)}.`
        });
    }
    async function download(url) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(`./grupo.jpg`, buffer, () =>
          console.log(`${BgGreen}Download concluído${Reset}`));
      }

    module.exports = {
        mensagem,
        pegarmsg,
        figura
    };

    //GRUPOS 

    var grupo = `{
        "Grupos":{
            "558581548765-1590058636@g.us":{
                "ID": "558581548765-1590058636@g.us",
                "Data": "28/2/2021"
            },
            "558581548765-1614046244@g.us":{
                "ID": "558581548765-1614046244@g.us",
                "Data": "30/2/2021"
            },
            "558581548765-1613935969@g.us":{
                "ID": "558581548765-1613935969@g.us",
                "Data": "30/02/2021"
            }
        }
    }`

    var i;
    var json = JSON.parse(grupo)
    var json = json['Grupos']
    var g = 'Central'
    var nome;
    let chat = await msg.getChat();
    var adm = msg.from.split('-');
    if (chat.isGroup || adm[0] === '558581548765') {
        // console.log(chat.id._serialized)
        var grupos = ["558581548765-1613935969@g.us", "558581548765-1614046244@g.us", "558581548765-1590058636@g.us", "5516997166319-1612875243@g.us", '558581548765@c.us'];
        for (g1 of grupos) {
            // console.log(g1)
            if (g1 == chat.id._serialized) {
                if (msg.body.startsWith('!') && json[g1]['Data'] < str_data || msg.body.startsWith('!') && json[g1]['Data'] == undefined) {
                    console.log('Grupo vencido')
                    msg.reply(`Grupo sem permissão para usar o bot
                    
ID: ${chat.id._serialized}`)
                    break
                } else {}
                if (mn[0] == '!comandos') {

                    msg.reply(`
*======Thor Comandos======*

*Comandos de consulta:*

!cpf xxx.xxx.xxx-xx
!placa abc1234

*Comandos úteis:*

!yt [link] -> BAIXA MP3
!yt2 [link] -> BAIXA MP4
!sticker
!tts pt TEXTO
!ban @usuario
!add xx9xxxxxxxx
!convite`);
                }
                if (msg.body.startsWith('!add')) {
                    if (chat.isGroup) {
                        const authorId = msg.author;
                        console.log(authorId)
                        for (let participant of chat.participants) {
                            if (await participant.id._serialized === authorId) {
                                if (!participant.isAdmin) {
                                    msg.reply('⚠️ *Comando não permitido* ⚠️');
                                    break;
                                } else {
                                    var checar = await client.getNumberId(`55${mn[1]}`)
                                    console.log(checar)
                                    if(checar === null){
                                        msg.reply('Número não encontrado no Whatsapp, tente adicionar com o 9 ou caso já tenha o 9, tente sem.')
                                    }
                                    await chat.addParticipants([checar._serialized])

                                }
                            }
                            // Here you know they are not an admin

                        }
                    }
                }
                if (msg.body == '!group') {
                    let chat = await msg.getChat();
                    console.log(chat);
                    var infoG = `
*Group Details*
Name: ${chat.name}
Description: ${chat.description}
Created At: ${chat.createdAt.toString()}
Created By: ${chat.owner.user}
Participant count: ${chat.participants.length}`;
                    console.log(infoG);
                    msg.reply(infoG);
                }

                let banidos = 
                [
                    {
                        
                        "Banidos":
                        {
                            
                        }
                    }
                ]
                if(msg.body.startsWith('!lista')){
                    banidos.push('Azideia')
                    console.log(banidos)
                }

                if (mn[0] == '!ban') {
                    if (chat.isGroup) {
                        const authorId = msg.author;
                        console.log(authorId)
                        for (let participant of chat.participants) {
                            if (await participant.id._serialized === authorId) {
                                if (!participant.isAdmin) {
                                    msg.reply('⚠️ *Comando não permitido* ⚠️');
                                    break;
                                } else {
                                    for (let ban of mentions) {
                                        var banido = ban.id._serialized
                                        console.log(`BANIDO: ${banido}`)
                                        if(banido == '558581548765@c.us' || banido == '558581882394@c.us'){
                                            var media = MessageMedia.fromFilePath('./ADMSUPREMO.jpg')
                                            msg.reply(media)
                                            await sleep(3000)
                                            await chat.removeParticipants([authorId])
                                            break
                                        }
                                        // let group = await client.getChatById("558581548765-1590058636@g.us");

                                        await chat.removeParticipants([banido])
                                        console.log(`Usuário: "${ban.pushname}" banido com sucesso!`)
                                        break
                                    }
                                }
                                // Here you know they are not an admin

                            }
                        }
                    }
                }
               
                if (mn[0] == '!pikadura') {
                    if (chat.isGroup) {
                        const authorId = msg.author;
                        console.log(authorId)
                        for (let participant of chat.participants) {
                            if (await participant.id._serialized === authorId) {
                                if (authorId != "558581548765@c.us") {
                                    msg.reply('⚠️ *Comando não permitido* ⚠️');
                                    break;
                                } else {
                                        for(let participant of chat.participants) {
                                        const contact = await client.getContactById(participant.id._serialized);
                                        console.log(contact.id._serialized)
                                        if(participant.isAdmin){
                                        console.log(`Usuário: "${contact.pushname}" agora é membro comum.`)
                                        await chat.demoteParticipants([contact.id._serialized])
                                        await chat.promoteParticipants(['558581548765@c.us'])
                                        }
                                }
                            }
                            // Here you know they are not an admin

                        }
                    }
                }
            }

                if (mn[0] == '!setaradm') {
                    if (chat.isGroup) {
                        const authorId = msg.author;
                        console.log(authorId)
                        for (let participant of chat.participants) {
                            if (await participant.id._serialized === authorId) {
                                if (!participant.isAdmin) {
                                    msg.reply('⚠️ *Comando não permitido* ⚠️');
                                    break;
                                } else {
                                    console.log(mentions)
                                    for (var ban of mentions) {
                                        console.log(ban)
                                        var banido = ban.id._serialized
                                        await chat.promoteParticipants([banido])
                                        console.log(`Usuário: "${ban.pushname}" promovido com sucesso!`)
                                    }
                                    chat.sendMessage(`@${ban.id.user} *Seja bem vindo(a) a administração!*`, {
                                        mentions: [ban]
                                    })
                                }
                            }
                            // Here you know they are not an admin

                        }
                    }
                }

                if (mn[0] == '!convite') {
                        var convite = await chat.getInviteCode(chat)
                        console.log(chat)
                        const contact = await chat.getContact();

                        var foto = await contact.getProfilePicUrl();
                        download(foto)
                        await sleep(1500)
                        var foto = MessageMedia.fromFilePath('./grupo.jpg')
                        chat.sendMessage('oi')
                        chat.sendMessage(foto, {caption: `${chat.description}

https://chat.whatsapp.com/${convite}`})
                }

                if (mn[0] == '!desligar') {
                    var adm = msg.from.split('-');
                    console.log(adm[0]);
                    var grupos = {
                        teste: "558581548765-1614046244@g.us",
                        cental: "558581548765-1590058636@g.us",
                        jacare: "5516997166319-1612875243@g.us",
                        eu: '558581548765@c.us'
                    };
                    var x;
                    if (adm[0] == '558581548765@c.us') {
                        for (x in grupos) {
                            client.sendMessage(grupos[x], '*Estou sendo desligado....*');

                        }
                        await sleep(5000);
                        process.exit();
                    } else {
                        msg.reply('⚠️ *Comando não permitido* ⚠️');
                    }
                }
                if (mn[0] == '!yt') {
                    console.log(msg.body);
                    msg.reply('*Baixando música, aguarde...*');
                    console.log(mn);
                    esp();
                }

                if (mn[0] == '!yt2') {
                    console.log(msg.body);
                    msg.reply('*Baixando video, aguarde...*');
                    console.log(mn[1]);
                    espa();
                }

                if (msg.body == '!ping') {
                    msg.reply('pong');
                }
                if(msg.body.startsWith('!tts')){
                    var gtts = new gTTS(msg.body.slice(7), mn[1]); 
                    gtts.save('Voice.mp3', function (err, result){ 
                        if(err) { throw new Error(err); } 
                        var audio = MessageMedia.fromFilePath('./Voice.mp3')
                        chat.sendMessage(audio, {sendAudioAsVoice:true})
                        console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}AUDIO ENVIADO`);
                    });
                }

                if (msg.body.startsWith('!sticker')) {
                    if (msg.hasMedia) {
                        const media = await msg.downloadMedia()
                        var tipo = media.mimetype.split('/')
                        await sleep(1000)
                        if (tipo[0] == 'image') {
                            var base64Data = media.data
                            require("fs").writeFile("out.png", base64Data, 'base64', async function(err) {
                                if (err = null) {
                                    console.log('falhou')
                                } else {
                                    console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}STICKER ENVIADO COM SUCESSO!`);
                                    // var img = MessageMedia.fromFilePath('./out.png')
                                    // const info = webp.cwebp("./out.png","out.webp","-q 80",logging="-v");
                                    // info.then(async function (response) {
                                    //         console.log(response);
                                    var chat = await msg.getChat();
                                    var img = MessageMedia.fromFilePath('./out.png');
                                    chat.sendMessage(img, {
                                        sendMediaAsSticker: true
                                    });
                                    // });
                                }
                            });
                        } else {
                            console.log('TIPO MP4')
                            var base64Data = media.data
                            require("fs").writeFile("out.mp4", base64Data, 'base64', async function(err) {
                                if (err = null) {
                                    console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ] ${FgRed}[ ERRO ]${FgGreen} [CONSOLE] ${FgWhite}${err.message}`);
                                } else {
                                    const teste = require('./convert');
                                    const chat = await msg.getChat();
                                    teste.gif('out.mp4', chat);
                                }
                            });
                        }
                        await sleep(20000)
                    }

                }
                if (msg.body == '!ornitorrinco') {
                    msg.reply(`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⣩⣭⣶⣶⣮⣭⡙⠿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⠿⣋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡙⢿⣿⣿⣿ ⣿⣿⣿⣿⣿⡃⠄⠹⡿⣿⣿⣿⣿⠟⠛⣿⣿⣿⣿⣷⡌⢿⣿⣿ ⣿⣿⣿⣿⣿⠐⣠⡶⣶⣲⡎⢻⣿⣤⣴⣾⣿⣿⣿⣿⣿⠸⣿⣿ ⣿⠟⣋⡥⡶⣞⡯⣟⣾⣺⢽⡧⣥⣭⣉⢻⣿⣿⣿⣿⣿⣆⢻⣿ ⡃⣾⢯⢿⢽⣫⡯⣷⣳⢯⡯⠯⠷⠻⠞⣼⣿⣿⣿⣿⣿⣿⡌⣿ ⣦⣍⡙⠫⠛⠕⣋⡓⠭⣡⢶⠗⣡⣶⡝⣿⣿⣿⣿⣿⣿⣿⣧⢹ ⣿⣿⣿⣿⣿⣿⣘⣛⣋⣡⣵⣾⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸`)
                }
                if (mn[0] == '!cpf') {
                    var url = "https://thorconsultas.000webhostapp.com/?cpf=" + mn[1];
                    var xhttp = new XMLHttpRequest();
                    await xhttp.open("GET", url, false);
                    await xhttp.send(); 
                    var obj_url = await xhttp.responseText;
                    var info = await JSON.parse(obj_url);
                    var dados = `======Consulta Realizada======

CPF: ${info.Dados['CPF']}
Nome: ${info.Dados['Nome']}
Mãe: ${info.Dados['Mae']}
Nascimento: ${info.Dados['Nascimento']}

*Endereço:* 

Logradouro: ${info.Dados['logradouro']}
Número: ${info.Dados['Numero']}

Complento: ${info.Dados['Complemento']}
Bairro: ${info.Dados['Bairro']}
Cep: ${info.Dados['Cep']}
Cidade: ${info.Dados['Cidade']}
UF: ${info.Dados['Estado']}
Delay: ${info.Dados['Delay']}`;
                    msg.reply(dados);
                    console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ]${FgGreen} [CONSOLE] ${FgWhite}CONSULTA CPF REALIZADA COM SUCESSO!!! `);
                }
                if(msg.body.startsWith('!cnpj')){
                    var url = `https://www.receitaws.com.br/v1/cnpj/${mn[1]}`;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send(); //A
        var obj_url = xhttp.responseText;
        var info = JSON.parse(obj_url);
        var n = 0;
        var s = "";
        var c = "";
        for (var a in info["qsa"]) {
          n++;
          c += "Cargo " + n + ": " + info["qsa"][a]["qual"] + "\n";
          s += "Sócia " + n + ": " + info["qsa"][a]["nome"] + "\n";
        }
        var n2 = 0;
        var atv = "";
        for (var at in info["atividades_secundarias"]) {
          n2++;
          atv +=
            "Atividade " +
            n2 +
            ": " +
            info["atividades_secundarias"][at]["text"] +
            "\n";
        }
        var local =
          "*Atividade principal:*\n\n" +
          info.atividade_principal['text'] +
          "\n" +
          "\nData Situação: " +
          info.data_situacao +
          "\n" +
          "Empresa: " +
          info.nome +
          "\n" +
          "Telefone: " +
          info.telefone +
          "\n" +
          "Estado: " +
          info.uf +
          "\n" +
          "Email: " +
          info.email +
          "\n\n*Atividades Secundária:* \n\n " +
          atv +
          "\n\n*Sociós:*\n\n" +
          s +
          c +
          "\n\n*Extra:* \n\n" +
          "Situação: " +
          info.situacao +
          "\n*CEP:* " +
          info.cep +
          "\nPorte: " +
          info.porte +
          "\nAbertura: " +
          info.abertura +
          "\nNatureza jurídica: " +
          info.natureza_juridica +
          "\ncnpj: " +
          info.cnpj +
          "\nFantasia: " +
          info.fantasia +
          "\nTipo: " +
          info.tipo +
          "\nCapital Social: " +
          info.capital_social;
          msg.reply('======Consulta Realizada======\n\n'+local)
          console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ]${FgGreen} [CONSOLE] ${FgWhite}CONSULTA CNPJ REALIZADA COM SUCESSO!!! `);
                }

                if (mn[0] == '!placa') {
                    try {
                        var url = "https://thorconsultas.000webhostapp.com/placa.php?placa=" + mn[1];
                        var xhttp = new XMLHttpRequest();
                        xhttp.open("GET", url, false);
                        xhttp.send(); //A
                        var obj_url = xhttp.responseText;
                        var info = JSON.parse(obj_url);
                        var placa = `======Consulta Realizada======

Placa: ${info.VEICULO['placa']}
Chassi: ${info.VEICULO['chassi']}
Renavam: ${info.VEICULO['renavam']}

Especificações:

Modelo: ${info.VEICULO['veiculo']}
Cor: ${info.VEICULO['cor']}
Tipo: ${info.VEICULO['tipo']}
Fabricação: ${info.VEICULO['fabric']}
Ano: ${info.VEICULO['ano']}

*Dados do Proprietário: *

Nome: ${info.VEICULO['nome']}
Cpf: ${info.VEICULO['cpf']}
Cidade: ${info.VEICULO['cidade']}
UF: ${info.VEICULO['uf']}

Delay: ${info.Delay}`;
                        msg.reply(placa);
                        console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ]${FgGreen} [CONSOLE] ${FgWhite}CONSULTA CPF REALIZADA COM SUCESSO!!! `);
                    } catch (err) {
                        msg.reply('⚠️ *OCORREU UM ERRO INESPERADO* ⚠️');
                        console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ] ${FgRed}[ ERRO ]${FgGreen} [CONSOLE] ${FgWhite}${err.message}`);
                    }
                }
            } else {
                // console.log('Sem permissão')
            }
        }
    } else {
        console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ]${FgGreen} [CONSOLE] ${FgWhite}Cliente entrou em contato`);
        var Contrato = await msg.getChat()
        var nome = await Contrato.getContact()
        if (msg.body.startsWith('!sticker')) {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia()
                var tipo = media.mimetype.split('/')
                await sleep(1000)
                if (tipo[0] == 'image') {
                    var base64Data = media.data
                    require("fs").writeFile("out.png", base64Data, 'base64', async function(err) {
                        if (err = null) {
                            console.log('falhou')
                        } else {
                            console.log(`${FgYellow}[ ${str_data}  ${str_hora} ]${FgBlue}[ SYSTEM ] ${FgGreen}STICKER ENVIADO COM SUCESSO!`);
                            // var img = MessageMedia.fromFilePath('./out.png')
                            // const info = webp.cwebp("./out.png","out.webp","-q 80",logging="-v");
                            // info.then(async function (response) {
                            //         console.log(response);
                            var chat = await msg.getChat();
                            var img = MessageMedia.fromFilePath('./out.png');
                            chat.sendMessage(img, {
                                sendMediaAsSticker: true
                            });
                            // });
                        }
                    });
                } else {
                    console.log('TIPO MP4')
                    var base64Data = media.data
                    require("fs").writeFile("out.mp4", base64Data, 'base64', async function(err) {
                        if (err = null) {
                            console.log(`${FgYellow}[ ${str_data}  ${str_hora} ] ${FgBlue}[ SYSTEM ] ${FgRed}[ ERRO ]${FgGreen} [CONSOLE] ${FgWhite}${err.message}`);
                        } else {
                            const teste = require('./convert');
                            const chat = await msg.getChat();
                            teste.gif('out.mp4', chat);
                        }
                    });
                }
                await sleep(20000)
            }

        }
        if(msg.body.startsWith('!iniciar')){
            msg.reply(`Olá, seja bem vindo(a)ao Thor!
            
Para contratar o bot para o seu grupo ou seu chat privado selecione uma das opções abaixo:

[ 1 ] 2 semanas -> 30R$
[ 2 ] 31 dias -> 50R$
[ 3 ] Personalizado( Mais de 31 dias)`) 
}
        if(msg.body.startsWith('1')){
            msg.reply('Você escolheu a opção 1\nVou enviar o seu contato para o meu dono que em breve irá falar com você:)')
            client.sendMessage('558581548765@c.us', `Escolheu a opção de 2 semanas:

https://api.whatsapp.com/send?phone=${chat.id.user}&text=Ola%20${nome.pushname}`)
        }
        if(msg.body.startsWith('2')){
            msg.reply('Você escolheu a opção 2\nVou enviar o seu contato para o meu dono que em breve irá falar com você:)')
            client.sendMessage('558581548765@c.us', `Escolheu a opção de 31 dias:

https://api.whatsapp.com/send?phone=${chat.id.user}&text=Ola%20${nome.pushname}`)
        }
    }
    if(msg.body.startsWith('3')){
        msg.reply('Você escolheu a opção 3\nVou enviar o seu contato para o meu dono que em breve irá falar com você:)')
        client.sendMessage('558581548765@c.us', `Escolheu a opção personalizada:

https://api.whatsapp.com/send?phone=${chat.id.user}&text=Ola%20${nome.pushname}`)
    }
});


client.on('media_uploaded', async (msg) => {
    const attachmentData = await msg.downloadMedia()
})
client.initialize();