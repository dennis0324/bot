const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES") || message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    let rolename = args[0];
    console.log(`${rolename}를 생성하려 시도중... `);
    var count = msgs.size;
    console.log(`count의 사이즈는${count} #1`);

    let roleAdding = message.guild.roles.cache.find(r => r.name === `${rolename}-pro`);
    console.log(roleAdding);
    if(roleAdding === null) console.log("생성중");
    
    if(!roleAdding) {
        try{
            createRole = message.guild.roles.create({
                data: {
                    name: `${rolename}-pro`,
                    color : `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    permissions: ['SEND_MESSAGES', 
                                  'READ_MESSAGE_HISTORY',
                                  'SEND_TTS_MESSAGES',
                                  'STREAM',
                                  'CONNECT',
                                  'SPEAK',
                                  'ATTACH_FILES',
                                  'CHANGE_NICKNAME',
                                  'ADD_REACTIONS']
                },
            }).catch(console.error);

            message.delete();
            let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.lightblue)
            .setAuthor(`알림`,message.guild.iconURL)
            .setDescription(`${rolename}역할이 성공적으로 추가되었습니다.`)
            .setFooter("도우미",null)
            message.channel.send(addRoleEmbed)
            msgs[count] = {
                message: rolename
            }
            count = count + 1;
            console.log(`count의 사이즈는${count} #2`);
            msgs.size = count;
            fs.writeFile("../rolelist.json",JSON.stringify (msgs,null,4)), err =>{
                if(err) throw err;
            } 
        }
        catch(e){
            //console.log(e.stack);
        }
    }
    else{
        message.channel.send(`이미 같은 이름이 존재합니다.`);
    }
    
}


module.exports.config = {
    name: "addrole",
    aliases: ["ar","addr","arole"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--addrole <게임 이름>",
    accessableby:"관리자"
}
