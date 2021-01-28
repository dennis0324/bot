const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

function messageEmbedClass (){
	
}


var proto = messageEmbedClass.prototype;

proto.sendSuccess = (bot,message) => {
	return new Discord.MessageEmbed()
		.setColor(Color.green_pastel)
		.setAuthor(`알림: ROLE`,"")
		.setDescription(message)
		.setFooter("도우미",bot.user.displayAvatarURL())
}

proto.sendWarn = (bot,message) => {
	return new Discord.MessageEmbed()
		.setColor(Color.yellow_pastel)
		.setAuthor(`알림: ROLE`,"")
		.setDescription(message)
		.setFooter("도우미",bot.user.displayAvatarURL())
}

proto.sendFail = (bot,message) => {
	return new Discord.MessageEmbed()
		.setColor(Color.red_pastel)
		.setAuthor(`알림: ROLE`,"")
		.setDescription(message)
		.setFooter("도우미",bot.user.displayAvatarURL())
}

module.exports = messageEmbedClass;