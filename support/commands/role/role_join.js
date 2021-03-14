const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const prefix = botconfig.prefix;

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

const dataSave = require('../../dataSave.js');

exports.run = async(bot, message, args, dbID) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    var string = args[0];
	console.log(args);
	const roleNames = dataSave.channelList;
    
    var playername = message.mentions.members.first();
    var roleAdding;
    var rolename;
    if(string.length < 1){
        console.log("명령어 입력 방식이 잘못되었습니다.");
		message.channel.send(meEmbed.sendFail(bot,"```\n명령어 입력 방식이 잘못되었습니다.\n 자세한 방법은 --help join를 참고해주세요.\n```"))
        return;
    }
	
	var guildRoles = new Array();
    roleNames.forEach((r,i) => {
		if(r.serverID === message.guild.id)
			guildRoles.push(r);
	})
	
	
    if(isNaN(string)){
        roleAdding = message.guild.roles.cache.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
		try{
			roleAdding = message.guild.roles.cache.find(r => r.name === `${guildRoles[string*1 - 1].roles}-pro`);
			rolename = `${guildRoles[string*1 - 1].roles}-pro`
			string = guildRoles[string*1 - 1].roles;
		}
		catch(err){}

    }
	
    if(!roleAdding){
        console.log("이름을 찾지 못하였습니다.")
		message.channel.send(meEmbed.sendFail(bot,`\`${rolename}\`존재하지 않습니다.`));
        return ;
    }
    
    if(args[1]){
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
        if(playername.roles.cache.find(r => r.name === rolename )){
			message.channel.send(meEmbed.sendFail(bot,`이미 \`${string}\`방에 들어와있습니다.`));
            return ;
        }
        await playername.roles.add(roleAdding.id);
		message.channel.send(meEmbed.sendSuccess(bot,`${playername}가 \`${string}\`방에 참여했습니다.`));
		console.log('======[user roles]=======');
		message.member.roles.cache.forEach(e => console.log(e.name));
		console.log('=============');
    }
    else{
        if(message.member.roles.cache.find(r => r.name === rolename )){
			message.channel.send(meEmbed.sendFail(bot,`이미 \`${string}\`방에 들어와있습니다.`));
            return ;
        }
       	await playername.roles.add(roleAdding.id);
		console.log('======[user roles]=======');
		message.member.roles.cache.forEach(e => console.log(e.name));
		console.log('=============');

		message.channel.send(meEmbed.sendSuccess(bot,`${message.author.username}가 \`${string}\`방에 참여했습니다.`));
    }
}



exports.config = {
	cmd : 'm|ember',
	options : {
		0: {
			name : 's|et',
			options : {
				0 : {
					args : '[Role / RoleNum] [@User]',
					explain : '유저에게 역할을 부여합니다.'
				},
				1 : {
					args : '[Role / RoleNum]',
					explain : '자신이 특정 역할에 들어갑니다.'
				}
				
			}
		}
	}
}
