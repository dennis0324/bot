const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
/*
event that catch when discord user status, or activities changes
*/
module.exports = bot =>{
    bot.once("presenceUpdate", (oldPresence, newPresence) => {
//        console.log(`${newPresence.user.tag} user is now ${newPresence.status} in guild ${newPresence.guild.name}`);
//        if (oldPresence.status !== newPresence.status) {
//            console.log(`${newPresence.user.tag} user is now ${newPresence.status} in guild ${newPresence.guild.name}`);
//            console.log(`old-> ${oldPresence.user.username} : ${oldPresence.activities.name} : ${oldPresence.createAt}`);
//            console.log(`new-> ${newPresence.user.username} : ${newPresence.activities.name} : ${newPresence.createAt}`);
 //       }
//        if (oldPresence.clientStatus !== newPresence.clientStatus) return;
        if (newPresence.member.user.bot) return;
        if (!newPresence.activities) return false;
        newPresence.activities.forEach(activity => {
            if( activity.type == "PLAYING"){ //need to change to Playing,STREAMING, etc. except custom_status using temp beacause of military
                console.log(newPresence.user.tag);
                console.log(activity.name.toLowerCase());
                
                let startingGame = newPresence.client.channels.cache.find(c => activity.name.toLowerCasec.includes(c.name.toLowerCase) && c.type !== "category");
                console.log(startingGame.name);
                if(startingGame) {
                    console.log("find game... searching for user's voice channel connection");
                }
                else{
                    concole.log("nothing has found");
                }
                bot.channels.cache.forEach(c => {
                    if(c.type != "category"){//to exclude category channels
                        if(activity.name == c.name){
                            if(newPresence.member.voice.channel){
                                console.log("detected in voice channel");
                            }
                        }
                    }
                });                
            }
        });
    });
}


