const Discord = require("discord.js");

module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    let roletesting = bot.user.guild.role.find(r => r.name === 'testing-pro')
    console.log(`${roletesting}`);
    // bot.user.setActivity("명령어에 귀 기울이는 중",{type: "STREAMING"});
    //
    // const allMembers = bot.users
    // console.log(`${allMembers.size}`)
    // allMembers.forEach(element => {
    //     if(element.roles.some(r => r.name === "Bot")){
    //         console.log("found bot!")
    //     }
    // });
    // console.log(`${bot_count}`);

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