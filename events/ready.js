const Discord = require("discord.js");

module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    // bot.user.setActivity("명령어에 귀 기울이는 중",{type: "STREAMING"});

    let statuses = [
        `${bot.guilds.size}!`,
        `--help`,
        `현재 ${Discord.users.size}개 실행 중...`
    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
}