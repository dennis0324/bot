const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");




module.exports.run = async(bot, message, args) =>{
    let messages = msgst[0].message;
    console.log(`${msgst}`);
    let Sembed = new Discord.RichEmbed()
        .setColor(Color.mint)
        .setAuthor(`참여방 목록`,message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**사용 가능한 명령어**\n명령어 수식어: ${prefix}`)

        msgst.forEach(element,index => {
            console.log(`${element.name}`);
            // Sembed.addField(`${index} ; ${element.message}`,``);
        });

        message.channel.send({embed: listembed});
}


module.exports.config = {
    name: "rolelist",
    aliases: ["rl","rolel"],
    description: "선택 가능한 역할을 볼 수 있습니다.",
    usage: "--rolelist",
    accessableby:"모든 이"
}