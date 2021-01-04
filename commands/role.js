const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");


const role_create = require("../support/role_create.js");
const role_remove = require("../supprot/role_remove.js");


//when user enter 'role' command this module will be executed
module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send(`\`\`\`ml\n \`옵션\`을 입력해주세요\n\`\`\``);
    if(args[0] === "create") {
        args.shift();
        role_create.run(bot,message,args);
    }
    else if(args[0] === "remove"){
        args.shift();
        role_remove.run(bot.message,args);
        console.log("member selected");
    } 
    else if(args[0] === "member") console.log("remove selected");
    else return message.channel.send(`\`\`\`ml\n* \`올바른 옵션\`을 입력해주세요\n자세한 내용은 help를 참조하세요\n\`\`\``);
}


module.exports.config = {
    name: "role",
    aliases: ["rl"],
    description: "```역할에 관련된 명령어를 사용할 수 있습니다.```",
    usage: "--role <options> [...]",
    accessableby:"모든 이 일부사용 가능"
}
