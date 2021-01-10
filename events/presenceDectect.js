const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;



client.on("presenceUpdate", (oldPresence, newPresence) => {
    if (!newPresence.activities) return false;
    console.log(newPresence);
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
        };
    });
});
