const Discord = require("discord.js");

module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    bot.channels.forEach(element => {
        console.log(`${element}`);
    });
    let statuses = [
        `${bot.guilds.size}!`,
        `--help`,
        `현재 ${bot.users.size}명 온라인!`
    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
}