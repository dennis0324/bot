const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Color = require("./colours.json");
const bot = new Discord.Client({disableEveryone: true});
require("./util/eventHandler")(bot)


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

var fileNum;

fs.readdir("./commands/",(err, files) =>{
    if(err) console.log(err)
    fileNum = files.length;
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
            return console.log("[LOGS] Couldn't Find Commands!");
    }
    

    jsfile.forEach((f,i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name,pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias,pull.config.name)
        });
    })
});

bot.on("messageUpdate", (oldMess,newMess) =>{
    console.log(`${oldMess},${newMess}`);
});

bot.on("message", message => {
    if(message.author.bot) return;

    if(message.channel.type === "text"){
        console.log("your sending in text channel!");
    }
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    
    let args = messageArray.slice(1);
    if(message.channel.type === "dm"){
        console.log("your sending with dm!");
        var selectnum = Number(cmd);
        bot.commands.get("help").run(bot,message,cmd,selectnum);     
    }
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) {
        commandfile.run(bot,message,args);
    }

})

bot.login(process.env.token);
