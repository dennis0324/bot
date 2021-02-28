  
const Discord = require("discord.js");
const fs = require('fs');

const join_database = require('../support/join_database.js');
const joinDB = new join_database();

const dataSave = require('../support/dataSave.js');


module.exports = async bot =>{
	
	await dataSave.updateData();
    let statuses = [ //bot's auto change status
        `${bot.guilds.cache.size}개의 서버에서 실행중!`,
        `--help`,
    ]
	const serverList = dataSave.serverSetting;

	for await(const guild of  bot.guilds.cache.map(e => e)){
		console.log(guild.id);
		let chkServer = serverList.find(server => server.serverID === guild.id);
		if(!chkServer) {
			const connection = await joinDB.get2DataBase();
			await connection.beginTransaction();
			const [result] = await connection.query('INSERT INTO serverSetting(serverID) VALUE (?)',[guild.id]);
			await connection.commit();
			connection.release();
		}
	}
	
    
    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
	console.log(`${bot.user.username} is online`);    //rule joiner is online

	//connection.end(); //mysql connection disable
}
