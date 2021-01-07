const Discord = require('discord.js');
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const fs = require('fs');
const prefix = botconfig.prefix;

const msgs = require("../rolelist.json")


exports.run = (bot, message, args) =>{
    if(!message.member.hasPermission("MANAGE_ROLES") || message.guild.owner) return message.channel.send("명령어를 쓸 권한이 없습니다.");

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("봇이 명령어를 사용할 수 있는 권한이 없습니다.");
    if(!args[0]) return message.channel.send("역할을 반드시 적으셔야 합니다.");
    var rolename;
    if(isNaN(args[0])){
        rolename = args[0];
    }
    else{
        rolename = msgs[args[0] * 1];
        console.log(rolename);
    }
    console.log(`${rolename}를 제거하려 시도중... `);
    var count = msgs.size;
    console.log(`count의 사이즈는${count} #1`);

    let roleAdding = message.guild.roles.cache.find(r => r.name === `${rolename}-pro`);

    if(!roleAdding) {
        let addRoleEmbed = new Discord.MessageEmbed()
            .setColor(Color.red_pastel)
            .setAuthor(`알림: ROLE`,"")
            .setDescription(`지울 수 있는 이름이 존재하지 않습니다.`)
            .setFooter("도우미",bot.user.displayAvatarURL())
        message.channel.send(addRoleEmbed)
    }
    else{
        try{
            roleAdding.delete();
            let addRoleEmbed = new Discord.MessageEmbed()
                .setColor(Color.green_pastel)
                .setAuthor(`알림: ROLE`,"")
                .setDescription(`\`${rolename}\`역할이 성공적으로 삭제되었습니다.`)
                .setFooter("도우미",bot.user.displayAvatarURL())
            message.channel.send(addRoleEmbed)
            var starting_point = getKeyByValue(msgs,`${rolename}`);
            console.log(`find in index #${starting_point}`);
            for(var i = starting_point; i < msgs.size; i++){
                console.log(`msgs value #${i}: ${msgs[i].message} `);
                delete msgs[i].message;
                if(i + 1 < msgs.size){
                    msgs[i].message = msgs[i + 1].message;
                }  
            }
            var temp = msgs.size;
            console.log(`msgs.size change before deleting : ${msgs.size}`);
            msgs.size = temp - 1;
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

function getKeyByValue(object, value) {
    for(var i = 0; i < object.size; i++){
        if(object[i].message == `${value}`){
            return i;  
        }
    }
  }
