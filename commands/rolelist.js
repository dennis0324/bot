const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    let messages = msgs[0].message;

    console.log(`${messages}`);
}


module.exports.config = {
    name: "rolelist",
    aliases: ["ar","addr","arole"],
    description: "선택 가능한 역할을 볼 수 있습니다.",
    usage: "--rolelist",
    accessableby:"Everyone"
}