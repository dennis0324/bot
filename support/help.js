const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

exports.run = function(bot, message, args, filesName){
    console.log(filesName[args]);
   
}
