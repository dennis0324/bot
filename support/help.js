const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

/*
this function is to help user to get command from help command
*/

var commands;
var command;
exports.run = function(bot, message, args, filesName){
    console.log(message.author.username);
    if(filesName.length < args){
        message.channel.send("```prolog\n없는 선택지입니다. \n```");
        return;
    }
    else{
        commands = filesName[args - 1]
    }
    
    if(bot.commands.has(commands)){
        message.author.DMChannel.delete();
        command = bot.commands.get(commands);
        var specificHelpEmbed = new Discord.MessageEmbed()
        .setColor(Color.mint)
        .setAuthor("알림",null)
        .setDescription(`봇 수식: ${prefix}\n\n**명령:** ${command.config.name}\n**부가설명:** ${command.config.description || "설명 없음"}\n**사용:** ${command.config.usage || "사용 없음"}\n**사용 가능한 역할:** ${command.config.accessableby || "Everyone"}\n**또 다른 명령어:** ${command.config.noalias || command.config.aliases}`)
        return message.channel.send({embed: specificHelpEmbed});
    }
}
