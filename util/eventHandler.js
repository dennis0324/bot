const reqEvent = (event) => require(`../events/${event}`)

module.exports = (bot,dbID) =>  {
    bot.on("ready",function() {reqEvent("ready") (bot,dbID)});
    bot.on("reconnecting",() => reqEvent("reconnecting") (bot));
    bot.on("disconnect",() => reqEvent("disconnect") (bot));
    bot.on("presenceUpdate",(oldPresence, newPresence)=>reqEvent("presenceUpdate")(oldPresence, newPresence,bot));
	bot.on("channelUpdate",(oldChannel,newChannel) => reqEvent("channelUpdate")(oldChannel,newChannel,bot));
    bot.on("warn",reqEvent("warn"));
    //bot.on("error",reqEvent("error"));
}
