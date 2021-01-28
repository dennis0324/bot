const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const messageEmbedClass = require("../../messageEmbedClass.js");
const meEmbed = new messageEmbedClass();

const join_database = require("./join_database.js");
const joinDB = new join_database();
const connection = joinDB.getDataBase();

exports.run = function(bot, message, args, serverList){ //role -c [rolename(category name)] [displayName] [gameName] [subcommands ...]
	
	//rolename이 이미 있을 경우에는 mysql 올리는 거 깡그리 무시하고 채널만 생성하는거로
	//
    console.log("role_create running..."); 

	
    //checking user's permissions
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");// if args is emtyp(null) then return
	
	var switch_num = 0, gameNameQuery;
	var roleNameArg = args[0], displayNameArg = args[1], gameNameArg = args[2]; //getting displayName ,gameName
	var displayName = null, gameName = null;
	var subcommands = args.pop(2); //getting sub command for creating specific channel later on
    let roleAdding = message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`); //getting roles from [roleNameArg]-pro
	if(!displayNameArg && !gameNameArg) switch_num = 1;
	else if(displayNameArg && gameNameArg) switch_num = 2;
	else switch_num = 0;
	
	const sql = 'SELECT gameName from channelNames where gameName = ?';
	const param = [gameNameArg];
	connection.query(sql,param,async (error, row, field) => { //getting gameName database from mysql
		if(error) throw error;
		gameNameQuery = row; //put row into gameNameQuery no needed remain for reading propose
		switch(switch_num){
			case 2:
				if(!gameNameQuery.length){
					let voiceChannel = message.guild.channels.cache.find(c => c.name == displayNameArg && c.type === 'voice');
					let textChannel = message.guild.channels.cache.find(c => c.anem == displayNameArg && c.type === 'text');
					if(voiceChannel || textChannel) {
						message.channel.send(meEmbed.sendFail(bot,`이미 같은 이름의 채널이 존재합니다.`));
						return;	
					}
				}
				else{
					console.log("it has been already register");
					message.channel.send(meEmbed.sendFail(bot,`이미 같은 이름이 존재합니다.`));
					return;

				}
				// var sql = "INSERT INTO `channelNames`(serverID, roles,displayName,gameName) VALUES (?,?,?,?)";
				// const serverID = message.guild.id; //adding single quote on string
				// var param = [serverID, roleNameArg, displayNameArg,gameNameArg]; //(serverID, roles, displayName, gameName, parentName)
				// connection.query(sql,param,(error, row, field) => {
				// 	if(error) throw error;
				// 	console.log("role %s added",displayNameArg);
				// });
			case 1:
				if(!roleAdding) {
					console.log("역할이 생성되었습니다.");
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
					console.log(message.guild.roles.cache.find(c => c.name === roleNameArg));
				}
				if( switch_num === 1 && roleAdding){
					console.log('동일 이름');
					message.channel.send(meEmbed.sendFail(bot,`이미 같은 이름이 존재합니다.`));
				}
				else if (switch_num != 0 && !gameNameQuery.length){
					creatingChannel(roleNameArg,displayNameArg);
					console.log('channelnames 성공적으로 실행완료');
					message.channel.send(meEmbed.sendSuccess(bot,`\`${gameNameArg}\`역할이 성공적으로 추가되었습니다.`));
				}
				break;
			case 0:
				message.channel.send(meEmbed.sendWarn(bot,"`DisplayName`과 `GameName`은 반드시 입려해야 합니다."));
				break;
			
		}
		console.log("role_create end");

	});
    
    async function creatingChannel(categoryName,channelName){
		let categoryChannel = await message.guild.channels.cache.find(c => c.name.toUpperCase() == categoryName.toUpperCase() && c.type === 'category')
		if(!categoryChannel){
			categoryChannel = await message.guild.channels.create(categoryName,{
				type: 'category',
				permissionOverwrites: [
					{
					  id: message.guild.roles.everyone, // shortcut for @everyone role ID
					  deny: 'VIEW_CHANNEL'
					},
					{
					  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
					  allow: 'VIEW_CHANNEL'
					}
				]
			})
			message.guild.channels.create(displayNameArg,{
				type : 'text',
				parent: categoryChannel.id,
				permissionOverwrites: [
				{
				  id: message.guild.roles.everyone, // shortcut for @everyone role ID
				  deny: 'VIEW_CHANNEL'
				},
				{
				  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
				  allow: 'VIEW_CHANNEL'
				}
				]
			})
		}
        message.guild.channels.create(channelName,{
			type: 'voice',
			parent: categoryChannel.id,
			permissionOverwrites: [
			{
			  id: message.guild.roles.everyone, // shortcut for @everyone role ID
			  deny: 'VIEW_CHANNEL'
			},
			{
			  id: message.guild.roles.cache.find(r => r.name === `${roleNameArg}-pro`).id,
			  allow: 'VIEW_CHANNEL'
			}
			]
		});
    }
	
    
}
