const Discord = require("discord.js");
const fs = require('fs');

const join_database = require('../support/join_database.js');
const joinDB = new join_database();

const dataSave = require('../support/dataSave.js');

<<<<<<< HEAD
module.exports = async (bot,dbID) =>{
	// const connection = await dbID.get2DataBase();
	// await connection.beginTransaction();
	// const [channelNames] = await connection.query('SELECT * FROM channelNames');
	// const [roles] = await connection.query('SELECT distinct roles FROM channelNames');
	// const [serverSetting] = await connection.query('SELECT * FROM serverSetting');
	// connection.release();
	
// 	dataSave.setRole(roles); //saving channelNames in static variable;
// 	dataSave.setChannel(channelNames);
// 	dataSave.setServer(serverSetting);
	dataSave.updateData();
	bot.guilds.cache.forEach(async g => {
		let find_channel = await g.channels.cache.find(c => c.name === 'idbot-notice');
		if(find_channel) return;
		g.channels.create('idbot-notice',{
			type : 'text',
			permissionOverwrites: [
			{
			  id: g.roles.everyone, // shortcut for @everyone role ID
			  deny: 'VIEW_CHANNEL'
			}
			]
		})
	})
    await console.log(`${bot.user.username} is online`);    //rule joiner is online
	// const connection = await joinDB.get2DataBase();
	
	// const [serverIDs,field] = await connection.query('SELECT serverID FROM serverSetting'); // this will be use in refresh role command
	// bot.guilds.cache.forEach(c => { //check all server is in database. maybe this will move to bot join event later on
	// 	let serverID = serverIDs.find(serverid => serverid.serverID === c.id); //comparing serverid and databaseiD
	// 	console.log(serverIDs);
	// 	if(!serverID){
	// 		console.log("inputing to database");
	// 		var sql = "INSERT INTO `serverSetting`(id, serverid, voiceAutoCreate) VALUES (?,?,1)";
	// 		const param = [serverIDs.length,c.id];
	// 		connection.query(sql,param, function (err, result) {
	// 			if (err) throw err;
	// 			console.log("1 record inserted");
	// 		});
	// 	}
	// });
	
=======


module.exports = bot =>{
    console.log(`${bot.user.username} is online`);    //rule joiner is online
    
	// connection.query('SELECT serverID FROM serverSetting', (error, rows, field) => { //getting serverID and check is included
	//     if( error ) throw error;
	// 	bot.guilds.cache.forEach(c => { //check all server is in database. maybe this will move to bot join event later on
	// 		let serverID = rows.find(serverid => serverid.serverID === c.id); //comparing serverid and databaseiD
	// 		if(!serverID){
	// 			console.log("inputing to database");
	// 			var sql = "INSERT INTO `serverSetting`(id, serverid, voiceAutoCreate) VALUES (?,?,1)";
	// 			const param = [rows.length,c.id];
	// 			connection.query(sql,param, function (err, result) {
	// 				if (err) throw err;
	// 				console.log("1 record inserted");
	// 			});
	// 		}
	// 	});
	// }); // this will be use in refresh role command
>>>>>>> a57b750f9e14dfcaacb11725bce7c7a9ff1581e5
	
		// bot.guilds.cache.forEach(element => {// getting a role that currently in server
		// connection.query("SELECT roles FROM channelNames Where serverID = '" + element.id+"'", (error, rows, field) => {
		// 	if(error) throw error;
		// 	element.roles.cache.forEach(j => {
		// 		if(j.name.includes('-pro')){ //getting role called [role_name]-pro
		// 			var testing = j.name.split('-'); //spliting -pro rolename
		// 			testing.pop(1); //extracting -pro from array
		// 			let roleName = rows.find(r => r.roles === testing.toString()); //get rolename from database and find in server(guild)
		// 			if(!roleName){ //if role is not in guild then add to database
		// 				if(testing){
		// 					const sql = "INSERT INTO `channelNames`(serverID, roles, displayName, gameName) VALUES (?,?,'testing','testing')";
		// 					const param = [element.id,testing];
		// 					connection.query(sql,param, function (err, result) {
		// 						if (err) throw err;
		// 						console.log("1 record inserted");
		// 					});
		// 				}
		// 			}
		// 		}
		// 	});
		// });
		// });
	
    let statuses = [ //bot's auto change status
        `${bot.guilds.cache.size}개의 서버에서 실행중!`,
        `--help`,
    ]

    
    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
	
	//connection.end(); //mysql connection disable
}
