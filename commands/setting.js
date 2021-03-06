const setting_list = require("../support/commands/setting/setting_list.js");
const setting_set = require("../support/commands/setting/setting_set.js");
const setting_member = require("../support/commands/setting/setting_member.js");



const dataSave = require('../support/dataSave.js');

module.exports.run = async(bot, message, args, dbID, outputResult) =>{ 
   if(!args[0]) return [false,'인수가 정확하게 입력되지 않았습니다.'];
	
	if(['list','-l'].includes(args[0])){
		args.shift();
		const returnValue = await setting_list.run(bot,message,args,dbID,outputResult);
		return returnValue;
	}else if(['member', '-m'].includes(args[0])){
		args.shift();
		const returnValue = await setting_member.run(bot,message,args,dbID,outputResult);
		return returnValue;
		
	} else if(['set', '-s'].includes(args[0])){
		args.shift();
		const returnValue = await setting_set.run(bot,message,args,dbID,outputResult);
		return returnValue;
	}
	else 
		return [false,'알 수 없는 옵션을 입력하셨습니다.']
	
}

module.exports.config = {
    name: "setting",
    aliases: ["st"],
    description: "서버 설정을 관리합니다.",
    usage: "--setting <options> [...]",
    accessableby:"일부 명령어 관리자만 사용 가능",
	indexCount: {
		default : 2,
		other: {
			'l' : [1],
			'm' : [2,3,4],
			's' : [2,3]
		},
		except: 1
	}
}