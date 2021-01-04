const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

/*
this function
*/
exports.run = function(bot, message, args, filesName){
    console.log(filesName[args]);
    console.log(filesName.length);
    console.log(args);
    if(filesName < args){
        console.log(message.channel.author);
        message.channel.SendMessage('```없는 선택지입니다. ```');
    }
}
