const Discord = require("discord.js");
const fs = require('fs');

const mysql = require('mysql');

// const connection = mysql.createConnection({
// 	host : `${process.env.DB_SITE}`,
// 	user : `${process.env.DB_ID}`,
// 	password : `${process.env.DB_PASS}`,
// 	database : `heroku_3cdd4905f680c6a`
// });

const connection = mysql.createConnection({
	host : `us-cdbr-east-02.cleardb.com`,
	user : `beeba3b53d8b34`,
	password : `10d4db29`,
	database : `heroku_3cdd4905f680c6a`
});

function handleDisconnect() {
  	connection.connect(function(err) {            
		if(err) {                            
			console.log('error when connecting to db:', err);
    		setTimeout(handleDisconnect, 2000); 
    	}                                   
  	});                                 
                                         
  	connection.on('error', function(err) {
    	console.log('db error', err);
    	if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
			return handleDisconnect();                      
		} 
		else {                                    
		  throw err;                              
		}
  	});
}

handleDisconnect();




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
