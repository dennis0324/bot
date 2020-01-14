const Discord = require("discord.js");

module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    bot.guilds.forEach(element => {
        element.roles..forEach(j => {
            console.log(`${j.name}`);
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