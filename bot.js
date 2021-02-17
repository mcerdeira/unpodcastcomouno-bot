const fs = require("fs");
const Discord = require('discord.js');
require("dotenv").config();
const client = new Discord.Client();
const url = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENTID}&scope=bot`;
const topicslist = JSON.parse(fs.readFileSync("./topics.json", "utf8"));
const topics = topicslist.topics;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(topics);
  });

client.on('message', msg => {
    if (msg.mentions.has(client.user.id)) {
        let tokens = msg.content.split(" ");
        if(tokens.length >= 2){
            switch(tokens[1]){
                case "idea":
                    let idx = Math.floor(Math.random() * topics.length);
                    msg.reply(`Acá tenes un tema ${topics[idx]}`);
                    break;
                case "list":
                    msg.reply(topics);
                    break;
                case "help":
                    msg.reply(`Los comandos son: idea, list, add y help! Para Invitarme: ${url}`);
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