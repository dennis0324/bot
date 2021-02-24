const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Color = require("./colours.json");
const bot = new Discord.Client({disableEveryone: true});
const join_database = require('./support/join_database.js');
const join_DB = new join_database();

require("./util/eventHandler")(bot,join_DB);

//reading all commands in diretory "./commands/"
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
var cmdNames;

//require for mysql2 


const role_remove = require("./support/commands/role/role_remove.js");

const dataSave = require('./support/dataSave.js');
const messageEmbedClass = require('./support/messageEmbedClass.js');
const meEmbed = new messageEmbedClass();


fs.readdir("./commands/",(err, files) =>{//to get module from ./commands file
    if(err) console.log(err)    
    let jsfile = files.filter(f => f.split(".").pop() === "js") //getting filename without ".js"
    cmdNames = new Array();
    if(jsfile.length <= 0){ //checking file length over 0
            return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f,i) => {
        let pull = require(`./commands/${f}`);//getting all files in ./commands/ folder
        bot.commands.set(pull.config.name,pull); //setting commmands with module exports config
        cmdNames.push(pull.config.name); //putting commands in array for help commands
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias,pull.config.name) //setting commands aliases(command that can use also)
        });
	})
	dataSave.setCommandList(cmdNames);

});


bot.on("message", async message => { //events that trigger at message or DM
	let prefix = botconfig.prefix; //getting "--" prefix for command 
	var cmdIndex = new Array();
	var tempReturns = new Array();
    if(message.author.bot) return; //return for bot
    if(!message.content.startsWith(prefix)) return; //if message is not start with prefix then return
	var messageArray = message.content.slice(prefix.length);
    messageArray = messageArray.replace(/\s+/g, '  ').split('  '); //spliting commands and args for next behavior
	
	const commandList = dataSave.commandList; //getting commmands from join_database
	var tempCmd = new Array();
	commandList.forEach(e => {
		tempCmd.push(bot.commands.get(e).config.aliases.concat(e));
	})
	messageArray.forEach((e,i) => {
		if(tempCmd.some(element => element.includes(e))) cmdIndex.push(i);
	})
	
	cmdIndex.sort((a,b) => {return b-a;}) //Descending cmdIndex
	console.log(messageArray);
	for await (const element of cmdIndex.map((e,i) => [e,i])) {
		var endNum, startNum; //value for starting and end index in command line
		var getIndex; //index length for getting 
		console.log(element[0],element[1]);//command index, forEach index

		endNum = cmdIndex[element[1] - 1];
		if(cmdIndex[element[1] - 1] === undefined)
			endNum =  messageArray.length;
		startNum = element[0];
		
		console.log("start: %s end: %s",startNum,endNum);

		let cmd = messageArray[startNum]; //get first cmd
		let secondCmd = messageArray[startNum +1]; //get second cmd
		let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd)); //check cmd is in commandList
		let argCounts = commandfile.config.indexCount; //get command's arg length
		console.log('argcount: ', argCounts);
		let defaultIndex = argCounts.default; //default arg length of command
		let otherIndexs = argCounts.other; //getting arg length setting
		let exceptIndex = argCounts.except;
		if(secondCmd) secondCmd = secondCmd.replace('-',""); //replacing - to nothing
		console.log('secondCmd:',secondCmd); 
		getIndex = defaultIndex; //setting to default arg length
		if(otherIndexs !== undefined){
			try{
				let findIndex = Object.entries(otherIndexs).find(argCount => secondCmd.startsWith(argCount[0]))
				console.log('findIndex:',findIndex);
				if(findIndex) getIndex = findIndex[1];
			}
			catch(err){
				
			}
		}
		if(messageArray[startNum + getIndex] === undefined) getIndex = exceptIndex;
		let chkNextCmd = bot.commands.get(messageArray[startNum + getIndex]) || bot.commands.get(bot.aliases.get(messageArray[startNum + getIndex]));
		if(chkNextCmd && exceptIndex) getIndex = exceptIndex;
		console.log('getIndex: ',getIndex);

		
		const subArray = messageArray.slice(startNum,startNum + getIndex + 1 );
		console.log('subArray:', subArray);
		let arrLength = subArray.length;
		let args = subArray.slice(1);
		
		
		console.log('cmd: %s, startNum: %d, endNum: %d args ->',cmd,startNum,startNum + getIndex,args);
		if(!commandfile) return;
		const returnValue = await commandfile.run(bot,message,args,join_DB,element[0]);
		console.log('reutnValue: ',returnValue);
		if(!returnValue[0]) {
			message.channel.send(meEmbed.sendFail(bot,`error:${returnValue[1]} index:[${startNum}]`));
			return;
		}
		if(element[0])
			messageArray.splice(startNum,arrLength,returnValue);
		console.log(messageArray)
			
	}
})

bot.login(process.env.token);
