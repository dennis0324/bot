const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
const msgst = require("../rolelist.json")

module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    
    for(var i = 0; i < msgst.size; i++){
        delete msgst[i];
    }
    var count = 0;
    bot.guilds.forEach(element => {
        element.roles.forEach(j => {
            if(j.name.includes('-pro')){
                var testing = j.name.split('-');
                testing.pop(1);
                msgst[count] = {
                    message: testing
                }
                //아직 파일 입출력 못 고침
    
                fs.writeFile("./rolelist.json",JSON.stringify (msgst,null,4), function(err) {
                    if(err) console.log('error',err);
                })
                console.log(`#${count} : ${testing}`);
                count++;
            }
        });
        msgst.size = count;

    });
}


module.exports.config = {
    name: "refresh",
    aliases: ["re"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--refresh",
    accessableby:"모든 이"
}