const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;
/*
    카카오톡 1대1 플러스 친구처럼 진행할 예정
    it's going to change to kakaotalk 1 vs 1 consulting
    helping log will be choosen by number you fill in messagebox
    UI will get simplify
*/
const fs = require("fs");


fs.readdir("./commands/",(err, files) =>{
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
            return console.log("[LOGS] Couldn't Find Commands!");
    }
    
    jsfile.forEach((f,i) => {
      
    })
});

module.exports.run = async (bot, message, cmd,args) =>{
  if(Number.isInteger(cmd)){
    if(!args){
      console.log(cmd);
      switch(cmd)
        case 1:
        console.log("1");
        break;
    }
  }
}
