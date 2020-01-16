const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json")

module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    
    var string = args[0];
    var playername = message.mentions.members.first();
    var checknum = Number(string)
    var roleAdding;
    var rolename;
    console.log(`${checknum}`)
    if(isNaN(checknum)){
        roleAdding = message.guild.roles.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
        roleAdding = message.guild.roles.find(r => r.name === `${msgst[checknum].message}-pro`);
        rolename = `${msgst[checknum].message}-pro`
    }

    if(!message.member.roles.find(r => r.name === rolename ) && !roleAdding){
        console.log("이름을 찾지 못하였습니다.")
        let embed = new Discord.RichEmbed()
        .setDescription(`${string}존재하지 않습니다.`);
        message.channel.send(embed);
        return ;
    }
    if(message.member.roles.find(r => r.name === rolename )){
        let embed = new Discord.RichEmbed()
        .setDescription(`이미 ${string}방에 들어와있습니다.`);
        message.channel.send(embed);
        return ;
    }

    if(!args[1]){
        console.log("왜 안돼?")
    }
    if(args[1]){
        playername.addRole(roleAdding.id).then(() => {
            console.log("successed!");
        })

        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author.username}가 ${string}방에 참여했습니다.`);
        message.channel.send(embed);
    }

    if(!args[1]){
        message.member.addRole(roleAdding.id).then(() =>{
            console.log("successed!");
        })
        
        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author.username}가 ${string}방에 참여했습니다.`);
        message.channel.send(embed);
    }
}


module.exports.config = {
    name: "join",
    aliases: ["j"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--join <목록 이름|숫자>",
    accessableby:"모든 이"
}