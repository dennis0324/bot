const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");

const emMess = require("../embedMessageTemp/notificate.js");
const role_create = require("../support/role_create.js");
const role_remove = require("../support/role_remove.js");
const role_remove = require("../support/role_join.js");


//when user enter 'role' command this module will be executed
module.exports.run = async(bot, message, args) =>{
    //if user didn't input any [options] in command
    if(!args[0]){
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription("\`[옵션]\`을 입력해주세요")
            message.channel.send(addRoleEmbed)
        return;
    } 
    // executing support/rolecreate
    if(args[0] === "create") {
        args.shift();
        role_create.run(bot,message,args);
    }
    // executing support/roleremove
    else if(args[0] === "remove"){
        args.shift();
        role_remove.run(bot,message,args);
    } 
    else if(args[0] === "member") {
        args.shift();
        if(args[0] === "join") {
            
        }console.log("selected join");
        else if(args[0] === "leave") console.log("selected leave");
        else console.log("바른 행동을 입력해주세요");
    }
    else {
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(`\`\`\`ml\n \`올바른 옵션\`을 입력해주세요\n자세한 내용은 help를 참조하세요\n\`\`\``)
            message.channel.send(addRoleEmbed)
        return;
    }
}


module.exports.config = {
    name: "role",
    aliases: ["rl"],
    description: "```역할에 관련된 명령어를 사용할 수 있습니다.```",
    usage: "--role <options> [...]",
    accessableby:"모든 이 일부사용 가능"
}
