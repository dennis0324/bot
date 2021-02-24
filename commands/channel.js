const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");

const embedSet = require("../support/embedHelper");
const channel_unset = require("../support/commands/channel/channel_unset.js");
const channel_set = require("../support/commands/channel/channel_set.js");
const channel_update = require("../support/commands/channel/channel_update.js");
const channel_list = require("../support/commands/channel/channel_list.js");



/*
channel 
	's'et [채널멘션] [역할] [게임이름]
	'u'nset [역할]
	'up'date [역할]
		gameName [이름]
		channelName [이름]
		
	
*/
module.exports.run = async (bot, message, args, dbID, outputResult) => {
	if(!args[0]) return [false,'인수가 정확하게 입력되지 않았습니다.'];
	
	if(['-u','unset'].includes(args[0])){
		args.shift();
		console.log('channel unset executing');
		let returnResult = await channel_unset.run(bot,message,args,dbID,outputResult);
		return returnResult;
	}
	else if(['-s','set'].includes(args[0])){
		args.shift();
		console.log('channel set executing');
		let returnResult = await channel_set.run(bot,message,args,dbID,outputResult);
		return returnResult;
	}
	else if(['-up','update'].includes(args[0])){
		args.shift();
		let returnResult = await channel_update.run(bot,message,args,dbID,outputResult);
		return returnResult;
	}
	else if(['-l','list'].includes(args[0])){
		args.shift();
		let returnResult = await channel_list.run(bot,message,args,dbID,outputResult);
		return returnResult;
	}
}

module.exports.config = {
	name: "channel",
    aliases: ["cl","chl"],
    description: "역할에 관련된 명령어를 사용할 수 있습니다.\n- [-c,create] [...]: 역할을 생성합니다.\n- [-r,remove] [...]: 역할을 삭제합니다.\n- [-m,member] <...> [...]: 플레이어의 역할을 관리합니다.\n- [-l,list]: 역할리스트를 보여줍니다.",
    usage: "--channel <options> [...]",
    accessableby:"관리자만 사용 가능",
	indexCount: {
		default: 2,
		other: {
			'up' : 4,
			's' : 4,
			'u' : 3,
			'l' : 2
		}
	}
}