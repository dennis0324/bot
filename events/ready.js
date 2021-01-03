const Discord = require("discord.js");
const fs = require('fs');
const msgst = require("../rolelist.json");

/*var mysql = require('mysql');

var connection = mysql.createConnection({
    host : `${process.env.DB_SITE}`,
    user : `${process.env.DB_ID}`,
    passworld : `${process.env.DB_PASS}`
});

connection.connect();

app.get('/',function(request,response){
    connection.query('SELECT & from t_users', function(err,rows,fields) {
        if(err){
            console.log('error',err);
            throw err;
        }
        console.log("testing clearDB");
    })
});
*/
module.exports = bot =>{
    console.log(`${bot.user.username} is online`);
    console.log(bot.guilds.cache.array.length);
    
    
    bot.guilds.cache.forEach(element => {
        var count = 0;
        element.roles.cache.forEach(j => {
            if(j.name.includes('-pro')){
                
                var testing = j.name.split('-');
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
        msgst.size = count;

    });
    let statuses = [
        `${bot.guilds.cache.size}개의 서버에서 실행중!`,
        `--help`,
        //`현재 ${bot.guilds.cache.user.size}명 온라인!`
    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status,{type: "LISTENING"});
    },5000)
}
