const Discord = require('discord.js');
require("dotenv").config();
const client = new Discord.Client();
const url = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot`;
const topics = [
    "Quests de mierda",
    "Juegos de pelea",
    "Juegos de diskettes",
    "El juego que creés que ninguno de los otros de nosotros conoce",
    "Juegos XXX",
    "Mitos urbanos de video juegos",
    "Juegos abandonados por frustración",
    "Un item que recuerdes",
    "Arcades de ayer y hoy. Tenemos para charlar de los que jugabamos de pibes y varios fuimos al sega club de Akihabara como para contar de lo que hay hoy alla.",
    "Códigos de protección en los juegos pirateados",
    "mi primera pc",
    "Mirc",
    "'Debo haber parecido un idiota!': trucos/habilidades/secretos que descubrimos demasiado tarde",
    "Virus o malware que hayan sufrido",
    "Juegos que todos deberían jugar",
    "Japanofilia - Cosas que nos gusten o nos llamen la atención de japón, o anécdotas de viaje",
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', msg => {
    if (msg.mentions.has(client.user.id)) {
        let tokens = msg.content.split(" ");
        if(tokens.length == 2){
            switch(tokens[1]){
                case "idea":
                    let idx = Math.floor(Math.random() * topics.length);
                    msg.reply(`Acá tenes un tema ${topics[idx]}`);
                    break;
                case "list":
                    msg.reply(topics);
                    break;
                case "help":
                    msg.reply(`Los comandos son: idea, list y help! Para Invitarme: ${url}`);
                    break;
                default:
                    msg.reply("What?");
                    break;
            }
        } else {
            msg.reply("What?");
        }
    }
});

client.login(process.env.TOKEN);