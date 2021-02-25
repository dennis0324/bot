
const dataSave = require('../../../support/dataSave.js');
const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

const join_database = require('../../join_database.js');
const joinDB = new join_database();


exports.run = async (bot, message, args, dbID, ouputResult) => {
	
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return [false,'명령어를 사용할 수 있는 권한이 없습니다.'];
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return [false,'봇이 명령어를 사용할 수 있는 권한이 없습니다.'];
	
	const serverSetting = dataSave.serverSetting;
	const settingNames = dataSave.settingList;
	
	var settingNameList = new Array();
	var serverSettNum = new Array();

	settingNames.forEach((settName,i) => {
		settingNameList.push(settName.Field)
		serverSettNum.push(i)
	})
	settingNameList.shift();
	serverSettNum.shift();
	
	var serverSettList = new Array();
	
	const serverSett = serverSetting.find(settName => {
		console.log(settName.serverID,':' ,message.guild.id)
		if(settName.serverID === message.guild.id)
			return true;
		})
	console.log(serverSett)
	settingNameList.forEach(settingName => serverSettList.push(serverSett[settingName]));
	
	message.channel.send(meEmbed.send(bot,[
		{name : 'NUM', value: serverSettNum},
		{name : 'SERVERSETTING', value: settingNameList},
		{name : 'VALUE', value : serverSettList}
	]))
	
	
	return [true];
}