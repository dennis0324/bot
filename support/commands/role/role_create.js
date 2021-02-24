const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const messageEmbedClass = require("../../messageEmbedClass.js");
const meEmbed = new messageEmbedClass();

const dataSave = require('../../dataSave.js');

exports.run = async (bot, message, args, dbID, ouputResult) =>{ //role -c [rolename(category name)] [displayName] [gameName] [subcommands ...]
	
	//rolename이 이미 있을 경우에는 mysql 올리는 거 깡그리 무시하고 채널만 생성하는거로
	//
    console.log("role_create running..."); 
	
	console.log('getting data from DB');
	const connection = await dbID.get2DataBase(); //creating cononection between code and database
	// const dbRoleGame = saveData.roleList; dont need for now change when new update release
	
    //checking user's permissions
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");// if args is emtyp(null) then return
	
	var roleNameArg, gameNameArg, displayNameArg;
	roleNameArg = args[0];
	
	
	let roleName = message.guild.roles.cache.find(r => r.name.toLowerCase() === `${roleNameArg.toLowerCase()}-pro`); //
	if(!roleName){
		console.log("역할 생성");
		var createRole = await message.guild.roles.create({
			data: {
			name: `${roleNameArg}-pro`,
			color : `#${Math.floor(Math.random()*16777215).toString(16)}`,
			permissions: ['SEND_MESSAGES', 
			'READ_MESSAGE_HISTORY',
			'SEND_TTS_MESSAGES',
			'STREAM',
			'CONNECT',
			'SPEAK',
			'ATTACH_FILES',
			'CHANGE_NICKNAME',
			'ADD_REACTIONS']
			},
		});
	}
	else{
		if(!ouputResult){
			console.log('오류 발생: 같은 이름의 역할 존재');
			message.channel.send(meEmbed.sendFail(bot,`이미 같은 이름의 역할이 존재합니다.`));
			return;
		}
	}
	// creatingChannel(roleNameArg,gameNameArg);
	
	await connection.beginTransaction();
	const sql = 'INSERT INTO `roleNames`(serverID,roles) VALUE(?,?)';
	const param = [message.guild.id,roleNameArg];
	const [result] = await connection.query(sql,param);
	await connection.commit();
	connection.release();
	message.channel.send(meEmbed.sendSuccess(bot,`\`${roleNameArg}\`역할이 성공적으로 추가되었습니다.`));
	await dataSave.updateData();
	console.log(dataSave.roleList);
	
		// async function creatingChannel(categoryName,channelName){
		// let categoryChannel = await message.guild.channels.cache.find(c => c.name.toUpperCase() == categoryName.toUpperCase() && c.type === 'category')
		// if(!categoryChannel){
		// 	categoryChannel = await message.guild.channels.create(categoryName,{
		// 		type: 'category',
		// 		permissionOverwrites: [
		// 			{
		// 			  id: message.guild.roles.everyone, // shortcut for @everyone role ID
		// 			  deny: 'VIEW_CHANNEL'
		// 			},
		// 			{
		// 			  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
		// 			  allow: 'VIEW_CHANNEL'
		// 			}
		// 		]
		// 	})
		// }
		// message.guild.channels.create(gameNameArg,{
		// 	type : 'text',
		// 	parent: categoryChannel.id,
		// 	permissionOverwrites: [
		// 	{
		// 	  id: message.guild.roles.everyone, // shortcut for @everyone role ID
		// 	  deny: 'VIEW_CHANNEL'
		// 	},
		// 	{
		// 	  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
		// 	  allow: 'VIEW_CHANNEL'
		// 	}
		// 	]
		// })
		// message.guild.channels.create(channelName,{
		// 	type: 'voice',
		// 	parent: categoryChannel.id,
		// 	permissionOverwrites: [
		// 	{
		// 	  id: message.guild.roles.everyone, // shortcut for @everyone role ID
		// 	  deny: 'VIEW_CHANNEL'
		// 	},
		// 	{
		// 	  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
		// 	  allow: 'VIEW_CHANNEL'
		// 	}
		// 	]
		// });
		// }
	
    
}
