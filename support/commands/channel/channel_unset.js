const dataSave = require('../../dataSave.js');

const join_database = require('../../join_database.js');
const joinDB = new join_database();

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0]) return [false,'역할을 정확하게 입력해주세요.'];
	if(!args[1]) return [false,'음성채널이름을 정확하게 입력해주세요.']
	
	const roleNames = dataSave.roleList; //getting data from dataSave 
	var findRole,findChannel; //variable for finding role
	var rlList = new Array(); //Filter out role that certain guild.id
	var chlList = new Array(); //Filter out channel that certain guild.id and roles
	roleNames.forEach(element => {
		if(element.serverID === message.guild.id){
			rlList.push(element.roles);
		}
	})
	args.forEach((arg,i) => {args[i] = arg.replace('_',' ')}); //making underbar to space
	
	//execution for arg is num for char
	if(isNaN(args[0])){
		if(rlList.find(role => role === args[0])) findRole = args[0];
		else return [false, '역할이름을 찾을 수 없습니다.'];
	}
	else{
		if(args[0] * 1 - 1< rlList.length) findRole = rlList[args[0] * 1 - 1];
		else return [false, '역할 번호를 잘못 입력하셨습니다.'];
	}
	console.log('findRole: ',findRole);
	
	const channelname = dataSave.channelList;
	channelname.forEach(element => {
		if(element.serverID === message.guild.id && element.roles === findRole)
			chlList.push(element.displayName);
	})
	console.log(chlList);
	
	//find voice channel from certain channel
	if(isNaN(args[1])){
		if(chlList.find(chl => chl === args[1])) findChannel = args[1];
		else return [false, '채널이름을 찾을 수 없습니다.'];
	}
	else{
		if(args[1] * 1 - 1< chlList.length) findChannel = chlList[args[1] * 1 - 1];
		else return [false, '채널 번호를 잘못 입력하셨습니다.'];
	}
	console.log('findRole: ',findRole);
	console.log('chlList: ',findChannel);
	
	
	let roleChannel = dataSave.channelList.find(element => element.roles === findRole);
	
	let roleName = message.guild.roles.cache.find(role => role.name === findRole);
	let channelName = message.guild.channels.cache.find(channel => channel.name === roleChannel.displayName);
	let everyone = message.guild.roles.everyone;
	
	//make channel public
	await channelName.updateOverwrite(everyone,{ VIEW_CHANNEL: true});
	
	//delete data from database
	const connection = await joinDB.get2DataBase();
	await connection.beginTransaction();
	const [result] = await connection.query('DELETE FROM channelNames where serverID = ? AND roles = ? ',[message.guild.id,findRole]);
	await connection.commit();
	connection.release();
	dataSave.updateData();//updating dataSave file
	
	
	if(!ouputResult)
		message.channel.send(meEmbed.sendSuccess(bot,`${findRole}를 해제하였습니다.`));
	return [true];
	
}