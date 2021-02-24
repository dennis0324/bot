const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const dataSave = require('../../dataSave.js');

exports.run = async(bot, message, args, dbID) =>{
	const roleNames = dataSave.roleList;
	var array = "";
    roleNames.forEach((r,i) => {
		// console.log(r.roles);
		// console.log(i);
		if(r.serverID === message.guild.id)
			array += `${i + 1}. ${r.roles}\n`;
	})
	let addRoleEmbed = new Discord.MessageEmbed()
	.setColor(Color.green_pastel)
	.setAuthor(`알림: ROLE`,"")
	.setDescription(`\`\`\`md\n* 참여 목록:\n${array}\n\`\`\``)
	message.channel.send(addRoleEmbed)
}

module.exports.config = {
    name: "rolelist",
    aliases: ["rl","rolel"],
    description: "선택 가능한 역할을 볼 수 있습니다.",
    usage: "--rolelist",
    accessableby:"모든 이"
}
