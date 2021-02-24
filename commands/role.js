const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const embedSet = require("../support/embedHelper");
const role_create = require("../support/commands/role/role_create.js");
const role_remove = require("../support/commands/role/role_remove.js");
const role_join = require("../support/commands/role/role_join.js");
const role_leave = require("../support/commands/role/role_leave.js");
const role_list = require("../support/commands/role/role_list.js");

const test = new embedSet(); //make new messageEmbed

const dataSave = require('../support/dataSave.js');

//when user enter 'role' command this module will be executed
module.exports.run = async(bot, message, args, dbID, outputResult) =>{
	// console.log('testing role');
	// console.log('role args:',args);
	// return;
	const connection = await dbID.get2DataBase();
	await connection.beginTransaction();
	const sql = "SELECT roles FROM channelNames Where serverID = ?";
	const param = [message.guild.id];
	const [rows,field] = await connection.query(sql,param);
	connection.release();
	var serverList = rows;
    //if user didn't input any [options] in command
    if(!args[0]){
        //../support/embedHelper
        return [false,'인수가 정확하게 입력되지 않았습니다.'];
    } 
    // executing support/rolecreate
    if(['create', '-c'].includes(args[0])) {
        args.shift();
        const returnValue = await role_create.run(bot,message,args,dbID,outputResult);
		return [true];
    }
    // executing support/roleremove
    else if(['remove', '-r'].includes(args[0])){
        args.shift();
        role_remove.run(bot,message,args,dbID,outputResult);
		return [true];
    } 
    // exe
    else if(['member', '-m'].includes(args[0])) {
        args.shift();
        if(['set', '-s'].includes(args[0])) {
            args.shift();
            role_join.run(bot,message,args,dbID,outputResult);
			return [true];
        }
        else if(['unset', '-u'].includes(args[0])) {
            args.shift();
            role_leave.run(bot,message,args,dbID,outputResult);
			return [true];
        }
        else {
            let addRoleEmbed = test.set(`알림: ROLE`,"바른 행동을 입력해주세요",Color.red_pastel);
            test.show(message,addRoleEmbed,serverList);
			return [false];
        }
    }
    else if(['list', '-l'].includes(args[0])){
        args.shift();
        role_list.run(bot,message,args,dbID);
		return [true];
    }
    else {
        let addRoleEmbed = test.set(`알림: ROLE`,`\`올바른 옵션\`을 입력해주세요\n자세한 내용은 \`--help\`를 참조하세요`,Color.red_pastel);
        test.show(message,addRoleEmbed);
        return [false];
    }
}


module.exports.config = {
    name: "role",
    aliases: ["rl","r"],
    description: "역할에 관련된 명령어를 사용할 수 있습니다.\n- [-c,create] [...]: 역할을 생성합니다.\n- [-r,remove] [...]: 역할을 삭제합니다.\n- [-m,member] <...> [...]: 플레이어의 역할을 관리합니다.\n- [-l,list]: 역할리스트를 보여줍니다.",
    usage: "--role <options> [...]",
    accessableby:"모든 이 일부사용 가능",
	indexCount: {
		default: 1,
		other: {
			'c' : 2,
			'r' : 2,
			'm' : 4
		}
	}
}
