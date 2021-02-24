const Discord = require("discord.js");
const fs = require('fs');

const join_database = require('../support/join_database.js');
const joinDB = new join_database();

const dataSave = require('../support/dataSave.js');

module.exports = bot =>{
    console.log(`${bot.user.username} is online`);    //rule joiner is online
	
    let statuses = [ //bot's auto change status
        `${bot.guilds.cache.size}개의 서버에서 실행중!`,
        `--help`,
    ]

    
    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
}
