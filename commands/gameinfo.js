const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")

/*
    명령어 사용 목적: 추후에 게임 사용시 자동으로 채널 변경하기 위한 목적
    명령어: --channelchange
    arg[0]: auto arg[1]: on/off
            alarm arg[1]: on/off
            
*/
module.exports.run = async(bot, message, args) =>{
    
}
