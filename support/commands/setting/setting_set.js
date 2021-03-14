
const dataSave = require('../../../support/dataSave.js');
const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

const join_database = require('../../join_database.js');
const joinDB = new join_database();

exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0]) return [false,'인수를 정확하게 입력해주세요.'];
	
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return [false,'명령어를 사용할 수 있는 권한이 없습니다.'];
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return [false,'봇이 명령어를 사용할 수 있는 권한이 없습니다.'];
	
	const settingList = dataSave.settingList;
	
	var findSetting;
	var stList = new Array();
	
	settingList.forEach(e => stList.push(e.Field))
	stList.shift(); //dont need serverID
	console.log('testing: ',args[1])
	if(isNaN(args[0])){
		if(stList.find(setting => setting === args[0])) findSetting = args[0];
		else return [false, '역할이름을 찾을 수 없습니다.'];
	}
	else{
		if(args[0] * 1 - 1 < stList.length) findSetting = stList[args[0] * 1 - 1];
		else return [false, '번호를 잘못 입력하셨습니다.'];
	}
	
	const serverSet = dataSave.serverSetting.find(setting => setting.serverID === message.guild.id);
	if(!args[1]){
		message.channel.send(meEmbed.send(bot,[
			{name: 'SETTINGNAME', value : findSetting},
			{name: 'VALUE', value: serverSet[findSetting]},
			{name: 'TYPE', value: settingList[args[0] * 1].Type}
		]))
		
	}
	else{
		const setValue = args[1] * 1;
		const beginValue = serverSet[findSetting] * 1;
		const connection = await joinDB.get2DataBase();
		await connection.beginTransaction();
		const [result] = await connection.query('UPDATE serverSetting SET ?? = ? WHERE ?? = ? AND serverID = ?',[findSetting,setValue,findSetting,beginValue,message.guild.id]);
		await connection.commit();
		connection.release();
		dataSave.updateData();
		message.channel.send(meEmbed.sendSuccess(bot,'정상적으로 설정 값을 바꾸었습니다.'));
	}
	return [true];
}

exports.config = {
	cmd : {
		's|et' : 'options'
	},
	options : {
		1 : {
			args : '[SettingName / Num] [Value]',
			explain : '서버 설정값을 변경합니다.'
		},
		2 : {
			args : '[SettingName / Num]',
			explain : '서버 설정값을 확인합니다.'
		}
	}
}