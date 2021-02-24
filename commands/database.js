//this command is only for development
const dataSave = require('../support/dataSave.js');

const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const messageEmbedClass = require('../support/messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

module.exports.run = async (bot, message, args, dbID) => {
	const connection = await dbID.get2DataBase();
	if(!args[0]){
		message.channel.send(meEmbed.sendFail(bot,"\`[옵션]\`을 입력해주세요"))
        return;
    } 
	if(message.member.id !== '267954312720678912') //my id
		return;
	console.log('activating db control')
    // executing support/rolecreate
    if(['show', '-s'].includes(args[0])) {
        args.shift();
		await connection.beginTransaction();
		const [result] = await connection.query('SELECT * FROM channelNames');
		connection.release();
		console.log(result[0].serverID);
		result.forEach(e => {
			console.log("%s -> %s: %s, %s, %s, %s",e.serverID,e.roles,e.gameName,e.displayName,e.parentName,e.channelType);
		})
    }
    // executing support/roleremove
    else if(['remove', '-r'].includes(args[0])){
        args.shift();
    } 
    // exe
    else if(['member', '-m'].includes(args[0])) {
        args.shift();
    }
    else if(['list', '-l'].includes(args[0])){
        args.shift();
    }
	else if(['update', '-up'].includes(args[0])){
        args.shift();
		dataSave.updateData();
		return [true];
    }
    
}

module.exports.config = {
    name: "database",
    aliases: ["db","d"],
    description: "개발자만 사용가능합니다.",
    usage: "--db <options> [...]",
    accessableby:"개발자 사용가능",
	indexCount: {
		default : 1
	}
}