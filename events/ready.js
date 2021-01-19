const Discord = require("discord.js");
const fs = require('fs');
const msgst = require("../rolelist.json");

const mysql = require('mysql');

const connection = mysql.createConnection({
	host : `${process.env.DB_SITE}`,
	user : `${process.env.DB_ID}`,
	password : `${process.env.DB_PASS}`,
	database : `heroku_3cdd4905f680c6a`
});

connection.connect();


module.exports = bot =>{
    console.log(`${bot.user.username} is online`);    //rule joiner is online
    
	connection.query('SELECT serverID FROM serverSetting', (error, rows, field) => { //getting serverID and check is included
	    if( error ) throw error;
		bot.guilds.cache.forEach((c,i) => {
			console.log("c: ",c);
// 			console.log("i: ",i);
// 			if(c.id === rows[i]){
// 				console.log("found same serverID");
// 			}
		});
		console.log("rows:",rows);
	});

    bot.guilds.cache.forEach(element => {// getting a role that currently in server
        var count = 0;
        element.roles.cache.forEach(j => {
            if(j.name.includes('-pro')){ //getting role called [role_name]-pro
                
                var testing = j.name.split('-'); //spliting -pro rolename
                testing.pop(1); //extracting -pro from array
                msgst[count] = {
                    message: testing
                }
    
                fs.writeFile("./rolelist.json",JSON.stringify (msgst,null,4), function(err) { //writing down roles in rolelist.json
                    if(err) console.log('error',err); //this part will be change to sqlite soon :D
                })
                count++;
            }
        });
        msgst.size = count;

    });
    let statuses = [ //bot's auto change status
        `${bot.guilds.cache.size}개의 서버에서 실행중!`,
        `--help`,
    ]

    
    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
	
connection.end(); //mysql connection disable
}
