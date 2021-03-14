
const dataSave = require('../../../support/dataSave.js');
const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

const join_database = require('../../join_database.js');
const joinDB = new join_database();


//--st -m [serversetting] [user] [value]
//--st -m [serversetting] [user]
//--st -m [serversetting] [value]
exports.run = async (bot, message, args, dbID, ouputResult) => {
	if(!args[0]) return [false,'설정을 입력하지않았습니다.'];

    const personalSett = dataSave.personalSett;
	const perSettList = dataSave.perSettList;
	console.log(message.author.id);
	var settingName = new Array();
	var numArr = new Array();
	perSettList.forEach((setting,i) => {
		if(i > 1){
			settingName.push(setting.Field);
			numArr.push(i - 1);
		}
	});
	
    var userMetion = message.mentions.members.first();
    var user;
	if(['-l','list'].includes(args[0])){
		message.channel.send(meEmbed.send(bot,[
			{name: 'NUM', value : numArr},
			{name: 'NAME', value : settingName}
		]))
		return [true];
	}
	if(!userMetion) return [false,'유저 이름을 입력해주십시오'];
	var settingInfo;
	if(isNaN(args[0])){
		if(!settingName.find(setting => setting === args[0]))
			return [false,'설정 이름이 존재하지 않습니다.'];
		settingInfo = args[0];
	}
	else{
		if(args[0] * 1 - 1 > settingName.length)
			return [false,'번호를 잘못 입력하셨습니다.'];
		settingInfo = settingName[args[0] * 1 - 1];
	}
	console.log(settingInfo);
	const connection = await joinDB.get2DataBase();
	await connection.beginTransaction();	
	if(args.length == 2 && userMetion){//if no one has mention then --st -m [serversetting] [user/value]
		console.log('testing 1');
		let userInfo = personalSett.find(member => member.userID === userMetion.id);
		console.log(userInfo);
		message.channel.send(meEmbed.send(bot,[
			{name : 'SETTINGNAME', value: settingInfo},
			{name : 'VALUE', value: userInfo[settingInfo]}
		]))
		return [true];
	}
	else if(args.length == 2 && !userMetion){
		console.log('testing 2');
		const [result] = await connection.query('UPDATE personalSetting SET ?? = ? where userID = ?',[settingInfo,args[1] * 1,message.author.id]);
		await connection.commit();
	}
	else{
		user = personalSett.find(userInfo => userInfo.userID === userMetion.id);
		if(!user) return [false,'유저를 찾을 수 없습니다.'];
		const [result] = await connection.query('UPDATE personalSetting SET ?? = ? where userID = ?',[settingInfo,args[2] * 1,userMetion.id]);
		await connection.commit();
	}

	connection.release();
	dataSave.updateData();
	message.channel.send(meEmbed.sendSuccess(bot,'성공적으로 설정을 업데이트하였습니다.'));
	return [true];
	
	
	
	
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return [false,'명령어를 사용할 수 있는 권한이 없습니다.'];
    //checking bot's permissions
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return [false,'봇이 명령어를 사용할 수 있는 권한이 없습니다.'];
	
	return [true];
}

exports.config = {
	cmd : 'm|ember',
	options : {
		0 : {
			name : 'l|ist',
			explain : '개인 설정 리스트를 확인합니다.'
		},
		1 : {
			args : '[ServerSetting / Num] [User] [Value]',
			explain : '유저의 개인 설정을 변경합니다.'
		},
		2 : {
			args : '[ServerSetting] [User]',
			explain : '유저의 개인 설정을 확인합니다.'
		},
		3 : {
			args : '[ServerSetting] [Value]',
			explain : '개인의 개인 설정을 변경합니다.'
		}
	}
}