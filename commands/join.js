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
    if(string.length > 1){
        console.log("명령어 입력 방식이 잘못되었습니다.");
        let embed = new Discord.RichEmbed()
        .setDescription("명령어 입력 방식이 잘못되었습니다.\n 자세한 방법은 --help join를 참고해주세요.");
        message.channel.send(embed);
        return;
    }
    if(isNaN(checknum)){
        roleAdding = message.guild.roles.cache.find(r => r.name === `${string}-pro`);
        rolename = `${string}-pro`;
    }
    else{
        roleAdding = message.guild.roles.find(r => r.name === `${msgst[checknum].message}-pro`);
        rolename = `${msgst[checknum].message}-pro`
    }
    console.log("testing line #1");
    let role = message.guild.roles.find(r => r.name === "Programmer");
    console.log(role.name);
    console.log(typeof(rolename));
    let testing1 = message.member.roles.find(r => r.name === "Team Mystic" );
    console.log(!testing1);
    
    
    if(!message.member.roles.find(r => r.name === rolename ) && !roleAdding){
        console.log("이름을 찾지 못하였습니다.")
        let embed = new Discord.RichEmbed()
        .setDescription(`${string}존재하지 않습니다.`);
        message.channel.send(embed);
        return ;
    }
    
    if(args[1]){
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");
        if(playername.roles.cache.find(r => r.name === rolename )){
            let embed = new Discord.RichEmbed()
            .setDescription(`이미 ${string}방에 들어와있습니다.`);
            message.channel.send(embed);
            return ;
        }
        playername.addRole(roleAdding.id).then(() => {
            console.log("successed!");
        })

        let embed = new Discord.RichEmbed()
        .setDescription(`${playername}가 ${string}방에 참여했습니다.`);
        message.channel.send(embed);
    }
    else{
        if(message.member.roles.cache.find(r => r.name === rolename )){
            let embed = new Discord.RichEmbed()
            .setDescription(`이미 ${string}방에 들어와있습니다.`);
            message.channel.send(embed);
            return ;
        }
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
    usage: "--join <목록 이름|숫자> @[사람 이름]",
    accessableby:"모든 이"
}
