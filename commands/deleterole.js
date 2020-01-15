const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


module.exports.run = async(bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    let rolename = args[0];
    console.log(`${rolename}를 제거하려 시도중... `);
    var count = msgs.size;
    console.log(`count의 사이즈는${count} #1`);

    let roleAdding = message.guild.roles.find(r => r.name === `${rolename}-pro`);

    if(!roleAdding) {
        message.channel.send(`지울 수 있는 이름이 존재하지 않습니다.`);
    }
    else{
        try{
            roleAdding.delete();
            message.delete();
            let addRoleEmbed = new Discord.RichEmbed()
            .setColor(Color.lightblue)
            .setAuthor(`알림`,message.guild.iconURL)
            .setDescription(`${rolename}역할이 성공적으로 삭제되었습니다.`)
            .setFooter("도우미",null)
            message.channel.send(addRoleEmbed)
            var starting_point = getKeyByValue(msgs,`${rolename}`);
            console.log(`find in index #${starting_point}`);
            for(var i = starting_point; i < msgs.size; i++){
                console.log(`msgs value #${i}: ${msgs[i].message} `);
                delete msgs[i].message;
                if(i + 1 <= msgs.size){
                    msgs[i].message = msgs[i + 1].message;
                }  
            }
            msgs.size -= 1;
            console.log(`msgs.size change after deleting : ${msgs.size}`);
            fs.writeFile("../rolelist.json",JSON.stringify (msgs,null,4)), err =>{
                if(err) throw err;
            } 
        }
        catch(e){
            //console.log(e.stack);
        }
        
    }
    
}


module.exports.config = {
    name: "deleterole",
    aliases: ["dr","deleter","derole"],
    description: "역할을 삭제할 수 있습니다.",
    usage: "--deleterole <게임 이름>",
    accessableby:"관리자"
}

function getKeyByValue(object, value) {
    for(var i = 0; i < object.size; i++){
        if(object[i].message == `${value}`){
            return i;  
        }
    }
  }