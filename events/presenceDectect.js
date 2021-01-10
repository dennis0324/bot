const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;


  
const Discord = require("discord.js");

module.exports = bot =>{
    bot.on("presenceUpdate", (oldPresence, newPresence) => {
        console.log(newPresence);
        if (!newPresence.activities) return false;
        console.log(newPresence);
        newPresence.activities.forEach(activity => {
            if (activity.type == "STREAMING") {
                console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
            };
        });
    });
}


