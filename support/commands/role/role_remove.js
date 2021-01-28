const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const prefix = botconfig.prefix;

const messageEmbedClass = require("../../messageEmbedClass.js");
const meEmbed = new messageEmbedClass();

const join_database = require("./join_database.js");
const conn = new join_database();

exports.run = async (bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    //if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
	
	var roleList;
	const connection = await conn.get2DataBase();
	await connection.beginTransaction(); // START TRANSACTION
	const sql = 'SELECT roles,displayName FROM channelNames WHERE serverID = ?';
	const param = [message.guild.id];
	console.log(message.guild.id);
	const [rows,field] = await connection.query('SELECT roles,displayName FROM channelNames WHERE serverID = ?',param);
	await connection.commit(); // COMMIT
	connection.release();
	
	console.log(rows);
    // var rolename;
    // if(isNaN(args[0])){
    //     rolename = args[0];
    // }
    // else{
    //     rolename = msgs[args[0] * 1].message;
    //     console.log(rolename);
    // }
    // console.log(`${rolename}를 제거하려 시도중... `);
    // var count = msgs.size;
    // console.log(`count의 사이즈는${count} #1`);

    // let roleAdding = message.guild.roles.cache.find(r => r.name === `${rolename}-pro`);

    // if(!roleAdding) message.channel.send(meEmbed.sendFail(`지울 수 있는 이름 이름이 존재하지 않습니다.`));
    // else{
    //     try{
    //         roleAdding.delete();
    //         message.channel.send(meEmbed.sendSuccess(`\`${rolename}\`역할이 성공적으로 삭제되었습니다.`))
    //     }
    //     catch(e){
    //         //console.log(e.stack);
    //     }
        
    // }
    
}

