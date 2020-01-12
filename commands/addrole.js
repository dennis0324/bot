const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    let rolename = args[0];
    console.log(`${rolename}를 생성하려 시도중...  ${msgs.size}으 크기`);
    let roleAdding = message.guild.roles.find(r => r.name === `${rolename}`);
    if(!roleAdding) {
        try{
            createRole = message.guild.createRole({
                name: `${rolename}`,
                color : "#ffffff",
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