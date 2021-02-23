const fs = require("fs");
const Discord = require('discord.js');
require("dotenv").config();
const client = new Discord.Client();
const url = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot`;
const topicslist = JSON.parse(fs.readFileSync("./topics.json", "utf8"));
let version = "";

listTopics = function(msg){
	let topics = topicslist.topics;
    let reply = "";
    topics.forEach(function (value, i) {
        reply += `${i}: ${value} \n`;
    });
    msg.reply(reply);
};

msgReact = function(msg, ok){
    if(ok){
        msg.react('🤖');
    } else {
        msg.react('💩');
        msg.reply(`WTF? Recibi: ${msg.content}`);
    }
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	version = require('./package.json').version;
	console.log(version);
  });

client.on('message', msg => {
    if (msg.mentions.has(client.user.id)) {
        let tokens = msg.content.split(" ").map(token => token.trim()).filter(Boolean);
        if(tokens.length >= 2){
            switch(tokens[1]){
                case "idea":
                    let topics = topicslist.topics;
                    msgReact(msg, true);
                    let idx = Math.floor(Math.random() * topics.length);
                    msg.reply(`Acá tenes un tema ${topics[idx]}`);
                    break;
                case "list":
                    msgReact(msg, true);
                    listTopics(msg);
                    break;
                case "help":
                    msgReact(msg, true);
                    msg.reply(`Version ${version} \n Los comandos son: idea, list, add {tema}, remove {indice} y help! Para Invitarme: ${url}`);
                    break;
                case "remove":
                    if(tokens.length == 3 && !isNaN(tokens[2])){
                        msgReact(msg, true);
                        let index = tokens[2];
                        topicslist.topics.splice(index, 1);
                        fs.writeFile("./topics.json", JSON.stringify(topicslist), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                msg.reply("Listorti!");
                                listTopics(msg);
                            }
                          });
                    } else {
                        msgReact(msg, false);
                        msg.reply("What???");
                    }
                    break;
                case "add":
                    if(tokens.length >= 3){
                        msgReact(msg, true);
                        let topic = tokens.slice(2, tokens.length).join(" ");
                        topicslist.topics.push(topic);
                        fs.writeFile("./topics.json", JSON.stringify(topicslist), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                msg.reply("Listorti!");
                                listTopics(msg);
                            }
                          });
                    } else {
                        msgReact(msg, false);
                    }
                    break;
                default:
                    msgReact(msg, false);
                    break;
            }
        } else {
            msgReact(msg, false);
        }
    }
});

client.login(process.env.TOKEN);