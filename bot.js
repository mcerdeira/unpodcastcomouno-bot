const fs = require("fs");
const Discord = require('discord.js');
require("dotenv").config();
const client = new Discord.Client();
const url = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot`;
const topicslist = JSON.parse(fs.readFileSync("./topics.json", "utf8"));
const topics = topicslist.topics;

listTopics = function(msg){
    let reply = "";
    topics.forEach(function (value, i) {
        reply += `${i}: ${value} \n`;
    });
    msg.reply(reply);
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(topics);
  });

client.on('message', msg => {
    if (msg.mentions.has(client.user.id)) {
        let tokens = msg.content.split(" ");
        msg.react(':robot:');
        if(tokens.length >= 2){
            switch(tokens[1]){
                case "idea":
                    let idx = Math.floor(Math.random() * topics.length);
                    msg.reply(`Acá tenes un tema ${topics[idx]}`);
                    break;
                case "list":
                    listTopics(msg);
                    break;
                case "help":
                    msg.reply(`Los comandos son: idea, list, add {tema}, remove {indice} y help! Para Invitarme: ${url}`);
                    break;
                case "remove":
                    if(tokens.length == 3 && !isNaN(tokens[2])){
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
                        msg.reply("What???");
                    }
                    break;
                case "add":
                    if(tokens.length >= 3){
                        let topic = tokens.slice(2, tokens.length).join(" ");
                        topicslist.topics.push(topic);
                        fs.writeFile("./topics.json", JSON.stringify(topicslist), (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                msg.reply("Listorti!");
                            }
                          });
                    } else {
                        msg.reply("What???");
                    }
                    break;
                default:
                    msg.reply("What?");
                    break;
            }
        } else {
            msg.reply("What??");
        }
    }
});

client.login(process.env.TOKEN);