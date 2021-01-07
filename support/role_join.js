const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json");

exports.run = (bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
   
    var string = args[0];
    var playername = message.mentions.members.first();
    var checknum = Number(string)
    var roleAdding;
    var rolename;
    console.log(`${checknum}`)
    if(string.length > 1){
        console.log("명령어 입력 방식이 잘못되었습니다.");
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription("```\n명령어 입력 방식이 잘못되었습니다.\n 자세한 방법은 --help join를 참고해주세요.\n```")
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
        return;
    }
    if(isNaN(checknum)){
        roleAdding = message.guild.roles.cache.cache.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
        roleAdding = message.guild.roles.cache.find(r => r.name === `${msgst[checknum].message}-pro`);
        rolename = `${msgst[checknum].message}-pro`
    }
    console.log("testing line #1");
    if(message.member.roles.cache.some(r => r.name === rolename )){
        console.log("testing");
    }
    else{
        console.log("no find");
    }
    if(!roleAdding){
        console.log("이름을 찾지 못하였습니다.")
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(``\`${rolename}\`존재하지 않습니다.`)
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
        return ;
    }
    
    if(args[1]){
        console.log(message.member.hasPermission('MANAGE_ROLES'));
        console.log(!message.guild.owner);
        if(!message.member.hasPermission('MANAGE_ROLES') || message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
        if(playername.roles.cache.find(r => r.name === rolename )){
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.red_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`이미 \`${rolename}\`방에 들어와있습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
            return ;
        }
        playername.roles.add(roleAdding.id).then(() => {
            console.log("successed!");
        })
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.green_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(`\`${playername}\`가 \`${rolename}\`방에 참여했습니다.`)
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
    }
    else{
        if(message.member.roles.cache.find(r => r.name === rolename )){
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.red_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`이미 \`${rolename}\`방에 들어와있습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
            return ;
        }
        message.member.addRole(roleAdding.id).then(() =>{
            console.log("successed!");
        })
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(`\`${message.author.username}\`가 ${rolename}방에 참여했습니다.`)
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
    }
}


module.exports.config = {
    name: "join",
    aliases: ["j"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--join <목록 이름|숫자> @[사람 이름]",
    accessableby:"모든 이"
}
