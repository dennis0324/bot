const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Color = require("./colours.json");
const helpNum = require("./support/help.js");
const bot = new Discord.Client({disableEveryone: true});
require("./util/eventHandler")(bot)

//reading all commands in diretory "./commands/"
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
var filesName;

fs.readdir("./commands/",(err, files) =>{//to get module from ./commands file
    if(err) console.log(err)    
    let jsfile = files.filter(f => f.split(".").pop() === "js") //getting filename without ".js"
    filesName = new Array(jsfile.length);
    if(jsfile.length <= 0){ //checking file length over 0
            return console.log("[LOGS] Couldn't Find Commands!");
    }
    

    jsfile.forEach((f,i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name,pull);
        filesName[i] = pull.config.name;
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias,pull.config.name)
        });
    })
});


bot.on("message", message => {
    if(message.author.bot) return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    
    let args = messageArray.slice(1);
    if(message.channel.type === "dm"){
        helpNum.run(bot,message,Number(cmd),filesName);     
    }
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) {
        commandfile.run(bot,message,args);
    }

})

bot.login(process.env.token);
