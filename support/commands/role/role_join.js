const Discord = require('discord.js');
const Color = require("../../../colours.json");
const botconfig = require("../../../botconfig.json");
const prefix = botconfig.prefix;

const messageEmbedClass = require('../../messageEmbedClass.js');
const meEmbed = new messageEmbedClass();

exports.run = async(bot, message, args, dbID) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    var string = args[0];
	console.log(args);
	const connnection = await dbID.get2DataBase();
	await connnection.beginTransaction();
	const [roleNames,field] = await connnection.query('SELECT distinct roles FROM channelNames WHERE serverID = ?',message.guild.id);
	connnection.release();
    
    var playername = message.mentions.members.first();
    var roleAdding;
    var rolename;
    if(string.length < 1){
        console.log("명령어 입력 방식이 잘못되었습니다.");
		message.channel.send(meEmbed.sendFail(bot,"```\n명령어 입력 방식이 잘못되었습니다.\n 자세한 방법은 --help join를 참고해주세요.\n```"))
        return;
    }
	
    if(isNaN(string)){
        roleAdding = message.guild.roles.cache.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
        roleAdding = message.guild.roles.cache.find(r => r.name === `${roleNames[string*1 - 1].roles}-pro`);
        rolename = `${roleNames[string*1 - 1].roles}-pro`
		string = roleNames[string*1 - 1].roles;
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
        playername.roles.add(roleAdding.id).then(() => {
            console.log("successed!");
        })
		message.channel.send(meEmbed.sendSuccess(bot,`${playername}가 \`${string}\`방에 참여했습니다.`));
    }
    else{
        if(message.member.roles.cache.find(r => r.name === rolename )){
			message.channel.send(meEmbed.sendFail(bot,`이미 \`${string}\`방에 들어와있습니다.`));
            return ;
        }
        message.member.roles.add(roleAdding.id).then(() =>{
            console.log("successed!");
        })
		message.channel.send(meEmbed.sendSuccess(bot,`${message.author.username}가 \`${string}\`방에 참여했습니다.`));
    }
}


module.exports.config = {
    name: "join",
    aliases: ["j"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--join <목록 이름|숫자> @[사람 이름]",
    accessableby:"모든 이"
}
