const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json")

exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    
    var string = args[0];
    var playername = message.mentions.members.first();
    var checknum = Number(string)
    var roleAdding;
    var rolename;
    console.log(`${checknum}`)
    if(isNaN(checknum)){
        roleAdding = message.guild.roles.cache.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
        roleAdding = message.guild.roles.cache.find(r => r.name === `${msgst[checknum].message}-pro`);
        rolename = `${msgst[checknum].message}-pro`
    }
    if(args[1]){
        if(!message.member.hasPermission("MANAGE_ROLES") || message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
        if(!playername.roles.cache.find(r => r.name === rolename ) && roleAdding){
            console.log("이미 탈퇴하였습니다.")
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.red_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`\`${string}\`를 이미 탈퇴하셨습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
            return ;
        }
        if(playername.roles.cache.find(r => r.name === rolename )){
            playername.removeRole(roleAdding.id).then(() => {
                console.log("successed!");
            })
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.green_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`${playername}가 \`${string}\`방에 탈퇴했습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
        }
    }
    else{
        if(!message.member.roles.find(r => r.name === rolename ) && roleAdding){
            console.log("이미 탈퇴하였습니다.")
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.red_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`\`${string}\`를 이미 탈퇴하셨습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
            return ;
        }
        message.member.removeRole(roleAdding.id).then(() =>{
            console.log("successed!");
        })
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.green_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(`${message.author.username}가 \`${string}\`방에 탈퇴했습니다.`)
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
    }
}


module.exports.config = {
    name: "leave",
    aliases: ["l"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--leave <목록 이름|숫자>",
    accessableby:"모든 이"
}
