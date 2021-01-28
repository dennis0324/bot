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

const join_database = require("../support/commands/role/join_database.js"); //getting database from class

const test = new embedSet(); //make new messageEmbed
const joinDB = new join_database();


//when user enter 'role' command this module will be executed
module.exports.run = async(bot, message, args) =>{
	const connection = await joinDB.get2DataBase();
	var serverID = message.guild.id;
	connection.beginTransaction();
	const sql = "SELECT roles FROM channelNames Where serverID = ?";
	const param = [serverID];
	const [rows,field] = await connection.query(sql,param);
	var serverList = rows;
    //if user didn't input any [options] in command
    if(!args[0]){
        //../support/embedHelper
        let addRoleEmbed = test.set(`알림: ROLE`,"\`[옵션]\`을 입력해주세요",Color.red_pastel);
        test.show(message,addRoleEmbed);
        return;
    } 
    // executing support/rolecreate
    if(['create', '-c'].includes(args[0])) {
        args.shift();
        role_create.run(bot,message,args,serverList);
    }
    // executing support/roleremove
    else if(['remove', '-r'].includes(args[0])){
        args.shift();
        role_remove.run(bot,message,args,serverList);
    } 
    // exe
    else if(['member', '-m'].includes(args[0])) {
        args.shift();
        if(['set', '-s'].includes(args[0])) {
            args.shift();
            role_join.run(bot,message,args,serverList);
        }
        else if(['unset', '-u'].includes(args[0])) {
            args.shift();
            role_leave.run(bot,message,args,serverList);
        }
        else {
            let addRoleEmbed = test.set(`알림: ROLE`,"바른 행동을 입력해주세요",Color.red_pastel);
            test.show(message,addRoleEmbed,serverList);
        }
    }
    else if(['list', '-l'].includes(args[0])){
        args.shift();
        role_list.run(bot,message,args,serverList);
    }
    else {
        let addRoleEmbed = test.set(`알림: ROLE`,`\`올바른 옵션\`을 입력해주세요\n자세한 내용은 \`--help\`를 참조하세요`,Color.red_pastel);
        test.show(message,addRoleEmbed);
        return;
    }
}


module.exports.config = {
    name: "role",
    aliases: ["rl"],
    description: "```역할에 관련된 명령어를 사용할 수 있습니다.```",
    usage: "--role <options> [...]",
    accessableby:"모든 이 일부사용 가능"
}
