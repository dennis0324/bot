const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");




module.exports.run = async(bot, message, args) =>{
    var array = "";
    let messages = msgst[0].message;
    let count_num = msgst.size;
    console.log(`${count_num}`);
    let Sembed = new Discord.RichEmbed()
        .setColor(Color.mint)
        .setDescription(`참여방 목록:`)

       for(var i = 0; i < count_num; i++){
           Sembed.addField(`#${i} : ${msgst[i].message}`,"1 ");
           array += `${i}. ${msgst[i].message}\n`;

       }


        message.channel.send(`\`\`\`md\n* 참여 목록:\n${array}\n\`\`\``);
}


module.exports.config = {
    name: "rolelist",
    aliases: ["rl","rolel"],
    description: "선택 가능한 역할을 볼 수 있습니다.",
    usage: "--rolelist",
    accessableby:"모든 이"
}