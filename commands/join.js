const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json")

module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    
    var string = args[0];
    var checknum = Number(string)
    
    if(isNaN(checknum)){
        let roleAdding = message.guild.roles.find(r => r.name === `${string}-pro`);
        console.log(`${message.member.user}`);
        // message.author.addrole(roleAdding.id).then(() =>{
        //     console.log("successed!");
        // })
    }
    console.log(testing);
    
}


module.exports.config = {
    name: "join",
    aliases: ["j"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--join <목록 이름|숫자>",
    accessableby:"모든 이"
}