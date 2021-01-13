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
        let pull = require(`./commands/${f}`);//getting all files in ./commands/ folder
        bot.commands.set(pull.config.name,pull); //setting commmands with module exports config
        filesName[i] = pull.config.name; //putting commands in array for help commands
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias,pull.config.name) //setting commands aliases(command that can use also)
        });
    })
});


bot.on("message", message => { //events that trigger at message or DM
    if(message.author.bot) return; //return for bot
    let prefix = botconfig.prefix; //getting "--" prefix for command 
    let messageArray = message.content.split(" "); //spliting commands and args for next behavior
    let cmd = messageArray[0].toLowerCase(); //setting commmand to lowercase
    
    let args = messageArray.slice(1); //getting all args 
    if(message.channel.type === "dm"){ //if texting channel is dm then activating help support
        helpNum.run(bot,message,Number(cmd),filesName); //passing to help support in support/help
    }
    if(!message.content.startsWith(prefix)) return; //if message is not start with prefix then return
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    //getting commandfile from the command
    if(commandfile) {
        commandfile.run(bot,message,args);//executing commandfile
    }
})

bot.login(process.env.token);
