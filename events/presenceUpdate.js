const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

const join_database = require('../support/join_database.js');
const joinDB = new join_database();

/*
event that catch when discord user status, or activities changes
*/
module.exports =async(oldPresence, newPresence,bot) =>{
    // bot.once("presenceUpdate", async () => {
       
    //     });
	 if (newPresence.member.user.bot) return; //if bot change presence return
        if (!newPresence.activities) return false; //if newPresence is null return

		
        newPresence.activities.forEach(async activity => {
            if( activity.type == "PLAYING"){ //need to change to Playing,STREAMING, etc. except custom_status using temp beacause of military
                console.log("presenceUpdate: ",newPresence.user.tag);
                console.log(activity.name);
				// const connection = await joinDB.get2DataBase();
				// await connection.beginTransaction();
				// const [result] = await connection.query('SELECT roles,displayName,gameName FROM channelNames WHERE serverID = ?',newPresence.guild.id);
				// connection.release();
				
				// const channelInfo = result.find(q => q.gameName === activity.name);
				// console.log(channelInfo);
				// if(!channelInfo) console.log('게임을 채널에서 찾을 수 없습니다.');
				
                // let startingGame = newPresence.client.channels.cache.find(c => c.name&& c.type !== "category");
                // console.log("presenceUpdate: ", startingGame.name);
                // if(startingGame) {
                //     console.log("presenceUpdate: find game... searching for user's voice channel connection");
                // }
                // else{
                //     concole.log("nothing has found");
                //     return;
                // }
                // bot.channels.cache.forEach(c => {
                //     if(c.type != "category"){//to exclude category channels
                //         if(activity.name == c.name){
                //             if(newPresence.member.voice.channel){
                //                 console.log("detected in voice channel");
                //             }
                //         }
                //     }
                // });                
            }
    });
}


