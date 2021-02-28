const Discord = require("discord.js");
const Color = require("../../../colours.json");

const dataSave = require('../../dataSave.js');

const join_database = require('../../join_database.js');
const joinDB = new join_database();

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

//command example: --chl -l [role]

exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0]) return [false,'역할을 입력해주십시오.'];
	console.log('channel_list running...');
	const roleNames = dataSave.roleList; //getting roleList from dataSave
	var rlList = new Array(); //array for guild id role
	
	var findRole; //variable for found channel and role
	
	roleNames.forEach(element => {
		if(element.serverID === message.guild.id)
			rlList.push(element.roles);
	})
	const chlNames = dataSave.channelList;

	var guildRoles = new Array();
    chlNames.forEach((r,i) => {
		if(r.serverID === message.guild.id)
			guildRoles.push(r);
	})
	
	if(isNaN(args[0])){
		if(rlList.find(role => role === args[0])) findRole = args[0];
		else return [false, '역할이름을 찾을 수 없습니다.'];
	}
	else{
		if(args[0] * 1 - 1 < rlList.length) findRole = rlList[args[0] * 1 - 1];
		else return [false, '번호를 잘못 입력하셨습니다.'];
	}
	args.forEach((arg,i) => {args[i] = arg.replace('_',' ')}); //making underbar to space
		
	var arrNum = "";
	var arrGameName = "";
	var arrDisplayName = "";

	const channelNames = dataSave.channelList;
	guildRoles.forEach((element,i) => {
		if(element.serverID === message.guild.id && element.roles === findRole){
			arrNum += `${i + 1}\n`;
			arrDisplayName += `${element.displayName}\n`;
			arrGameName += `${element.gameName}\n`;
		}
	})
	
	if(arrNum.length <= 0){
		message.channel.send(meEmbed.sendSuccess(bot,'존재하지 않습니다.'));
		return [true];
	}
	//message that cmd has been succeed
	if(!ouputResult){
		let addRoleEmbed = new Discord.MessageEmbed()
			.setColor(Color.green_pastel)
			.setAuthor(`알림: ROLE`,"")
			.addFields(
				{ name: 'NUMBER', value: arrNum , inline: true},
				{ name: 'CHANNELNAME', value: arrDisplayName , inline: true},
				{ name: 'GAMENAME', value: arrGameName ,inline: true}
    		)
	message.channel.send(addRoleEmbed)
	}
	return [true];
}