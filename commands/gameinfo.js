const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const messageEmbedClass = require('../support/messageEmbedClass.js');
const meEmbed = new messageEmbedClass;

/*
[
  Activity {
    name: 'MapleStory',
    type: 'PLAYING',
    url: null,
    details: null,
    state: null,
    applicationID: '359510095811444736',
    timestamps: { start: 2021-02-13T03:52:26.698Z, end: null },
    party: null,
    assets: null,
    syncID: undefined,
    flags: ActivityFlags { bitfield: 0 },
    emoji: null,
    createdTimestamp: 1613188346810
  }
]
            
*/
module.exports.run = async(bot, message, args, dbID, outputResult) =>{
	var gameInfo,user;
	console.log('gameInfo staring');
	console.log(outputResult);
	if(args.length > 1) {
		message.channel.send(meEmbed.sendFail(bot,'args has to be one'))
	}
	if(args[0]){
		const userID = args[0].slice(3,args[0].length - 1);
		console.log('user id: ',userID);
		user= message.guild.members.cache.find(user => user.id === userID);
		[gameInfo] = user.presence.activities;
	}
	else {
		user = message.author;
		gameInfo = message.author.presence.activities.shift();
		
	}
	console.log('gameInfo:',gameInfo);
	var returnValue;
	if(outputResult == 0){
		if(!gameInfo) {
			message.channel.send(meEmbed.sendFail(bot,'게임을 플레이하고 있지 않습니다.'))
			return;
		}
		message.channel.send(meEmbed.sendSuccess(bot,`${user}는 ${gameInfo.name}를 ${gameInfo.type}하는 중입니다.`));
		return;
	}
	else{
		if(!gameInfo) return [false,'게임읖 실제로 플레이하고 있는 유저를 멘션해주십시오'];
		else return gameInfo.name;
	}
}


module.exports.config = {
    name: "gameinfo",
    aliases: ["gi","gamei","ginfo"],
    description: "",
    usage: "--gameinfo",
    accessableby:"모든 이",
	indexCount: {
		default : 1,
		except: 0
	}
}

//아직 모듈 매겨변수 변경 필요 (bot,message,args,dbID)