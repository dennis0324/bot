const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");


const role_create = require("../support/role_create.js");



module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("```prolog\n옵션에 기입해 주십시오\n```");
    if(args[0] === "create") role_create.run(bot,message,args);
    else if(args[0] === "member") console.log("member selected");
    else if(args[0] === "remove") console.log("remove selected");
}


module.exports.config = {
    name: "role",
    aliases: ["rl"],
    description: "```역할에 관련된 명령어를 사용할 수 있습니다.```",
    usage: "--role <options> [...]",
    accessableby:"모든 이 일부사용 가능"
}
