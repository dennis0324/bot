const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

exports.run = function(bot, message, args, filesName){
    console.log(filesName[args]);
    if(filesName < args){
        message.channel.send("```목록에 있는 숫자를 사용하여주십시오```");
        return;
    }
}
