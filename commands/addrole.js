const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    let rolename = args[0];
    console.log(`${rolename}를 생성하려 시도중...  ${msgs}`);
    
    let roleAdding = message.guild.roles.find(r => r.name === `${rolename}`);

    if(!roleAdding) {
        try{
            createRole = message.guild.createRole({
                name: `${rolename}`,
                color : `${Math.floor(Math.random() * 16,777,216)}`,
                permissions:[]
            })
            message.guild.channels.forEach(async(channel,id) => {
                await channel.overwritePermissions(createRole,{
                    SEND_MESSAGE: true,
                    ADD_REACTIONS: true,
                    SEND_TTS_MESSAGES: true,
                    ATTACH_FILES: true,
                    SPEAK: true
                })
            });
            let addRoleEmbed = Discord.RichEmbed()
            .setColor(Color.lightblue)
            .setAuthor(`알림`,message.guild.iconURL)
            .setDescription(`${rolename}역할이 성공적으로 추가되었습니다.`)
            message.channel.send({embed: addRoleEmbed})
        }
        catch(e){
            console.log(e.stack);
        }
    }
    
}


module.exports.config = {
    name: "addrole",
    aliases: ["ar","addr","arole"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--addrole <게임 이름>",
    accessableby:"Everyone"
}