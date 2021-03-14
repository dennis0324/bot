const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const dataSave = require('../../dataSave.js');

exports.run = async(bot, message, args, dbID) =>{
	const roleNames = dataSave.roleList;
	console.log(roleNames);
	var array = new Array();
	var text = "";
    roleNames.forEach((r,i) => {
		if(r.serverID === message.guild.id)
			array.push(r);
	})
	console.log(array);
	array.forEach((r,i) => {
		console.log(r.roles);
		if(r.serverID === message.guild.id)
			text += `${i + 1}. ${r.roles}\n`;
	})
	let addRoleEmbed = new Discord.MessageEmbed()
	.setColor(Color.green_pastel)
	.setAuthor(`알림: ROLE`,"")
	.setDescription(`\`\`\`md\n* 참여 목록:\n${text}\n\`\`\``)
	message.channel.send(addRoleEmbed)
}

exports.config = {
	cmd : 'l|ist',
	options : {
		0 :{
			explain: '사용자가 쓸 수 있는 역할을 봅니다.'	
		}
	}
}
