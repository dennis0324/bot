const Discord = require("discord.js");
const fs = require('fs');
const msgst = require("../rolelist.json");


module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    bot.guilds.forEach(element => {
        element.roles.forEach(j => {
            var count = 0;
            if(j.name.includes('-pro')){
                console.log(`#${count} : ${testing}`);
                var testing = element.name.split('-');
                testing.pop(1);
                msgst[count] = {
                    message: testing
                }
                //아직 파일 입출력 못 고침
    
                fs.writeFile("./rolelist.json",JSON.stringify (msgst,null,4), function(err) {
                    if(err) console.log('error',err);
                })
                
                count++;
            }
        });
        
    });
    let statuses = [
        `${bot.guilds.size}개의 서버에서 실행중!`,
        `--help`,
        `현재 ${bot.users.size}명 온라인!`
    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
}