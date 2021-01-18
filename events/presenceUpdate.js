const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
/*
event that catch when discord user status, or activities changes
*/
module.exports = bot =>{
    bot.once("presenceUpdate", (oldPresence, newPresence) => {
        if (newPresence.member.user.bot) return; //if bot change presence return
        if (!newPresence.activities) return false; //if newPresence is null return
        
        newPresence.activities.forEach(activity => {
            if( activity.type == "PLAYING"){ //need to change to Playing,STREAMING, etc. except custom_status using temp beacause of military
                console.log("presenceUpdate: ",newPresence.user.tag);
                console.log(activity.name.toLowerCase());
                
                let startingGame = newPresence.client.channels.cache.find(c => activity.name.toLowerCasec.includes(c.name.toLowerCase) && c.type !== "category");
                console.log("presenceUpdate: ", startingGame.name);
                if(startingGame) {
                    console.log("presenceUpdate: find game... searching for user's voice channel connection");
                }
                else{
                    concole.log("nothing has found");
                    return;
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


