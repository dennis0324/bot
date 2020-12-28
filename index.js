const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Color = require("./colours.json");
const bot = new Discord.Client({disableEveryone: true});
require("./util/eventHandler")(bot)


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/",(err, files) =>{
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f,i) => {
        console.log(f);
        let pull = require(`./commands/${f}`);
        console.log(`${pull.config.name}${pull}`);
        bot.commands.set(pull.name,pull);
//         pull.config.aliases.forEach(alias => {
//             bot.aliases.set(alias,pull.config.name)
//         });
    })
});


bot.on("message",async message => {
    if(message.author.bot ||message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    console.log(cmd);
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    console.log(cmd.slice(prefix.length));
    console.log(bot.aliases.get(cmd.slice(prefix.length)));
    
    console.log(commandfile);
    if(commandfile) {
        commandfile.run(bot,message,args);
    }

})

bot.login(process.env.token);
