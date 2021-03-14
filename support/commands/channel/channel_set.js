const dataSave = require('../../dataSave.js');

const join_database = require('../../join_database.js');
const joinDB = new join_database();

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0] || !args[1] || !args[2]) return [false,'인수를 정확하게 입력해주세요.'];
	
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return [false,'명령어를 사용할 수 있는 권한이 없습니다.'];
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return [false,'봇이 명령어를 사용할 수 있는 권한이 없습니다.'];
	
	const roleNames = dataSave.roleList; //getting roleList from dataSave
	var rlList = new Array(); //array for guild id role
	
	var findRole,findChannel; //variable for found channel and role
	
	roleNames.forEach(element => {
		if(element.serverID === message.guild.id)
			rlList.push(element.roles);
	})
	args.forEach((arg,i) => {args[i] = arg.replace('_',' ')}); //making underbar to space
	
	findChannel = args[1]; //put value into channel name
	if(isNaN(args[0])) //checking role input is num or char
		findRole = args[0];
	else
		findRole = rlList[args[0] * 1 - 1];
	
	let channelName = message.guild.channels.cache.find(channel => channel.name === findChannel);
	let roleName = message.guild.roles.cache.find(role => role.name === `${findRole}-pro`);
	let gameName = args[2];
	let everyone = message.guild.roles.everyone;
	if(!channelName || !roleName) return [false,'역할 혹은 음성채팅방을 찾을 수 없습니다.'];
	
	//checking gameName has already created
	let chkGameName = dataSave.channelList.find(element => element.gameName === gameName && element.serverID === message.guild.id)
	if(chkGameName) return [false, '이미 설정한 게임이름이 존재합니다.']; //if game already exsisted return fail
	
	//connection for database
	const connection = await joinDB.get2DataBase();
	await connection.beginTransaction();
	const [result] = await connection.query('INSERT INTO channelNames(serverID,roles,gameName,displayName) value (?,?,?,?)',[message.guild.id,findRole,gameName,findChannel]);
	await connection.commit();
	connection.release();
	dataSave.updateData();
	
	//setting channel setting to make private channel
	await channelName.updateOverwrite(everyone,{ VIEW_CHANNEL: false});
	await channelName.updateOverwrite(roleName,{ VIEW_CHANNEL: true});
	
	//message that cmd has been succeed
	if(!ouputResult)
		message.channel.send(meEmbed.sendSuccess(bot,`게임 \`${gameName}\`와(과) 채널\`${findChannel}\`를(을) ${findRole}에 귀속시켰습니다.`));
	return [true];
}

exports.config = {
	cmd : 's|et',
	options: {
		0: {
			args : '[Role / RoleNum] [VoiceChannelName] [GameName]',
			explain : '역할에 게임이름과 채널을 귀속시켜줍니다.'	
		}

	}
}
