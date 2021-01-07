const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");


class embedHelper {
    constructor(){}
    
    set(title, descript, color){
        return new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(title,"")
            .setDescription(descript)
    }

    
    show(message, embed){
        message.channel.send(embed);
    }
}

module.exports = embedHelper
