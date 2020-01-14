const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    message.guild.roles.forEach(element => {
        if(element.name.includes('-pro')){
            var testing = element.name.split('-');
            testing.pop(1);
            
            console.log(`${testing}   -pro`);
        }
    });
    //let messages = msgs[0].message;
}


module.exports.config = {
    name: "rolelist",
    aliases: ["rl","rolel"],
    description: "선택 가능한 역할을 볼 수 있습니다.",
    usage: "--rolelist",
    accessableby:"모든 이"
}