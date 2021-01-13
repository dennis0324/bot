const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
/*
event that catch when discord user status, or activities changes
*/
module.exports = bot =>{
    bot.on("presenceUpdate", (oldPresence, newPresence) => {
        if (!newPresence.activities) return false;
        newPresence.activities.forEach(activity => {
            if (activity.type == "STREAMING") {
                console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
            };
        });
        newPresence.activities.forEach(activity => {
            if( activity.type == "CUSTOM_STATUS"){
                console.log("he is playing");
            }
        });
    });
}


