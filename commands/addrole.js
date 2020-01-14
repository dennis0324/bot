const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    let rolename = args[0];
    console.log(`${rolename}를 생성하려 시도중...  ${msgs}`);
    var count = 0;

    if(!msgs){
        count = 0;
    }
    console.log(`count의 사이즈는${count}`);

    let roleAdding = message.guild.roles.find(r => r.name === `${rolename}`);

    if(!roleAdding) {
        try{
            createRole = message.guild.createRole({
                name: `${rolename}`,
                color : "#333333",
                permissions:[]
            })
            message.guild.channels.forEach(async(channel,id) => {
                await channel.overwritePermissions(createRole,{
                    SEND_MESSAGE: true,
                    ADD_REACTIONS: true,
                    SEND_TTS_MESSAGES: true,
                    ATTACH_FILES: true,
                    SPEAK: true
                })
            });

            message.delete();
            let addRoleEmbed = new Discord.RichEmbed()
            .setColor(Color.lightblue)
            .setAuthor(`알림`,message.guild.iconURL)
            .setDescription(`${rolename}역할이 성공적으로 추가되었습니다.`)
            .setFooter("도우미",null)
            message.channel.send(addRoleEmbed)
            msgs[count] = {
                message: rolename
            }
            // fs.writeFile("./rolelist.json",JSON.stringify (msgs,null,4)), err =>{
            //     if(err) throw err;
            // }
        }
        catch(e){
            console.log(e.stack);
        }
    }
    
}


module.exports.config = {
    name: "addrole",
    aliases: ["ar","addr","arole"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--addrole <게임 이름>",
    accessableby:"Everyone"
}