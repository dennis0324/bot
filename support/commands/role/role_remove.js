const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const prefix = botconfig.prefix;

const messageEmbedClass = require("../../messageEmbedClass.js");
const meEmbed = new messageEmbedClass();

const dataSave = require('../../dataSave.js');
// const join_database = require("../../join_database.js");
// const join_DB = new join_database();

exports.run = async (bot, message, args, dbID) =>{
	const connection = await dbID.get2DataBase();
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    //if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
	const roleNames = dataSave.roleList;
	const channelNames = dataSave.channelList;
;
    var rolename;
    if(isNaN(args[0])){
        rolename = args[0];
    }
    else{
        rolename = roleNames[args[0] * 1 - 1].roles;
        console.log(rolename);
    }
    console.log(`${rolename}를 제거하려 시도중... `);
	const channelInfo = channelNames.find(e => e.roles === rolename);
    let roleAdding = message.guild.roles.cache.find(r => r.name === `${rolename}-pro`);
    if(!roleAdding) message.channel.send(meEmbed.sendFail(bot,`지울 수 있는 이름 이름이 존재하지 않습니다.`));
    else{
		const guildSetting = dataSave.serverSetting.find(c => c.serverID === message.guild.id);
		if(guildSetting.deletingCooldown == 0){
			console.log('deletingCooldown is less then 1');
			return;
		}
		console.log('성공적으로 역할을 찾아서 지우는 중입니다...')
		message.channel.send(meEmbed.sendWarn(bot,`${rolename}정말로 지우시겠습니까?\n${guildSetting.createNameCooldown / 1000}초 뒤 자동 취소됩니다. \`(Y/N)\``));
		try{
			var childChannels;
			const filter = m => m.author.id === message.author.id
			message.channel.awaitMessages(filter, { max: 1, time: guildSetting.createNameCooldown, errors: ['time'] }).then(reply =>{

				reply = reply.first().content;
				if(reply.toLowerCase() === 'y' || reply.toLowerCase() === 'yes') {
					roleAdding.delete(); //deleting role
					deletingDB();
					message.channel.send(meEmbed.sendSuccess(bot,`\`${rolename}\`를 성공적으로 지우셨습니다.`))
					return 'true';
				}
				else 
					message.channel.send(meEmbed.sendFail(bot,`\`y/n\`이외의 답변을 적으셔서 취소됩니다.`))
					return;
			})		
		}
		catch(e){
			message.channel.send(meEmbed.sendFail(bot,`${guildSetting.createNameCooldown / 1000}초가 지나 취소되었습니다.`))
			return;
		}
    }
	
	async function deletingDB(){
		try{

			await connection.beginTransaction();
			const [roleDeleteResult] = await connection.query('DELETE FROM channelNames WHERE roles = ?',rolename);
			const [roleResult] = await connection.query('DELETE FROM roleNames WHERE roles = ?',rolename);
			await connection.commit();
			connection.release();
			console.log(roleDeleteResult);
			dataSave.updateData();
		}
		catch(e){
			//console.log(e.stack);
		}
		return;
		
	}
    
}

