const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
/*
event that catch when discord user status, or activities changes
*/
module.exports = bot =>{
    bot.on("presenceUpdate", (oldPresence, newPresence) => {
        console.log(oldPresence.clientStatus);
        console.log(newPresence.clientStatus);
        if (oldPresence.clientStatus !== newPresence.clientStatus) return;
        if (newPresence.member.user.bot) return;
        console.log(oldPresence.user.username);
        console.log(newPresence.user.username);
        if (!newPresence.activities) return false;
        newPresence.activities.forEach(activity => {
            if (activity.type == "STREAMING") {
                console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
            };
        });
        newPresence.activities.forEach(activity => {
            if( activity.type == "CUSTOM_STATUS"){ //need to change to Playing,STREAMING, etc. except custom_status using temp beacause of military
                console.log(activity.name);
                bot.channels.cache.forEach(c => {
                    if(c.type != "category"){//to exclude category channels
                        if(activity.name == c.name){
                            console.log(`playing ${c.name}`);
                        }
                    }
                });                
            }
        });
    });
}


