const dataSave = require('../../dataSave.js');

const join_database = require('../../join_database.js');
const joinDB = new join_database();

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0]) return [false,'옵션을 적어주십시오. 1'];
	if(!args[1]) return [false,'변경될 이름을 적어주십시오.'];
	if(!args[2]) return [false,'변경 후 이름을 적어주십시오.'];
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return [false,'명령어를 사용할 수 있는 권한이 없습니다.'];
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return [false,'봇이 명령어를 사용할 수 있는 권한이 없습니다.'];
	
	const channelNames = dataSave.channelList; //getting data from dataSave 
	var clList = new Array(); //Filter out role that certain guild.id
	var findChannel;
	channelNames.forEach(element => {
		if(element.serverID === message.guild.id){
			clList.push([element.displayName,element.gameName]);
		}
	})
	console.log(clList);
	if(isNaN(args[1])){
		let searchChannel = clList.find(channel => channel[0] === args[1] || channel[1] === args[1])
		if(searchChannel) findChannel = searchChannel
		else return [false, '역할이름을 찾을 수 없습니다.'];
	}
	else{
		if(args[1] * 1 - 1< clList.length) findChannel = clList[args[1] * 1 - 1];
		else return [false, '번호를 잘못 입력하셨습니다.'];
	}
	console.log(findChannel)
	let preData = dataSave.channelList.find(element => element.serverID === message.guild.id && (element.gameName == findChannel[1] || element.displayName === findChannel[0]));
	if(!preData) return [false,'변경할 이름을 찾을 수 없습니다.'];
	
	
	console.log(preData);
	const connection = await joinDB.get2DataBase();
	// checking option for next step
	if(['-g','game'].includes(args[0])){
		console.log('exectuing game update==========');
		await connection.beginTransaction();
		const [result] = await connection.query('UPDATE channelNames SET gameName = ? where serverID = ? AND gameName = ?',[args[2],message.guild.id,preData.gameName]);
		await connection.commit();
		connection.release();
		
		
	}
	else if(['-c','channel'].includes(args[0])){
		console.log('exectuing channel update==========');
		let preChlName = await message.guild.channels.cache.find(channel => channel.name === preData.displayName)
		let changeChlName = await message.guild.channels.cache.find(channel => channel.name === args[2]);
		if(!changeChlName) 
			return [false,'음성 채널을 찾을 수 없습니다.'];
		let findRole = await message.guild.roles.cache.find(role => role.name === `${preData.roles}-pro`);
		let everyone = await message.guild.roles.everyone;
		await preChlName.updateOverwrite(everyone,{ VIEW_CHANNEL: true});
		
		await changeChlName.updateOverwrite(everyone,{ VIEW_CHANNEL: false});
		await changeChlName.updateOverwrite(findRole,{ VIEW_CHANNEL: true});


		await connection.beginTransaction();
		const [result] = await connection.query('UPDATE channelNames SET displayName = ? where serverID = ? AND displayName = ?',[args[2],message.guild.id,preData.displayName]);
		await connection.commit();
		connection.release();
	}
	else{
		return [false,'옵션이 존재하지 않습니다.'];
	}
	dataSave.updateData();
	if(!ouputResult)
		message.channel.send(meEmbed.sendSuccess(bot,'성공적으로 수정하였습니다.'));
	return [true];
}

exports.config = {
	cmd : 'up|date',
	options : {
		0: {
			cmd : 'g|ame',
			options:{
				0 :{
					args : '[Role / RoleNum] [PreGameName/Num] [AfterGameName]',
					explain : '역할이 귀속되어있는 게임 이름을 변경합니다.'					
				}
			}
		},
		1 : {
			cmd : 'c|hannel',
			options: {
				0: {
					args : '[Role / RoleNum] [PreChannelName/Num] [AfterChannelName]',
					explain : '역할이 귀속되어있는 채널 이름을 변경합니다.'						
				}
			
			}

		}
		
	}
}