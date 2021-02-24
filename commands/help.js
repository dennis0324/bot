const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

const helpNum = require("../support/help.js");

/*
    카카오톡 1대1 플러스 친구처럼 진행할 예정
    it's going to change to kakaotalk 1 vs 1 consulting
    helping log will be choosen by number you fill in messagebox
    UI will get simplify
*/

const fs = require('fs');

const messsageEmbedClass = require('../support/messageEmbedClass.js');
const meEmbed = new messsageEmbedClass();

const dataSave = require('../support/dataSave.js');



module.exports.run = async (bot, message, args) =>{
    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)
	const commands = dataSave.commandList;
    if(args[0]) {
		var command ;
		if(commands.length < args){
			message.channel.send("```prolog\n없는 선택지입니다. \n```");
			return;
		}

		if(isNaN(args[0])) command = args[0];
		else command = commands[args[0] - 1].split('.').shift();
		
        console.log(`${command}`);
        if(bot.commands.has(command)){
            console.log(`counting testing num of if`);
            command = bot.commands.get(command);
            var specificHelpEmbed = new Discord.MessageEmbed()
            .setColor(Color.mint)
            .setAuthor("",message.guild.iconURL)
            .setDescription(`봇 수식: ${prefix}\n\n**명령:** ${command.config.name}\n**부가설명:** \`\`\`${command.config.description || "설명 없음"}\`\`\`\n**사용:** ${command.config.usage || "사용 없음"}\n**사용 가능한 역할:** ${command.config.accessableby || "Everyone"}\n**또 다른 명령어:** ${command.config.noalias || command.config.aliases}`)
            return message.channel.send({embed: specificHelpEmbed});
        }
    }

    if(!args[0]){
		var descript = "```md\n* 참여 목록:";
		commands.forEach((f,i) => {
			descript += `\n${i+1}. ${f.split(".").shift()}`;
		})
		descript += "\n```";

        let Sembed = new Discord.MessageEmbed()
        .setColor(Color.mint)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("무엇을 도와드릴까요?")
        .addField("검색 가능한 명령어",`${descript}`,true)
        .setFooter("참여 봇",bot.users.displayAvatarURL)


        message.channel.send(Sembed);

    }
}

module.exports.config = {
    name: "help",
    aliases: ["h","commands"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--help",
    accessableby:"Everyone",
	indexCount: {
		default: 1,
		except: 0
	}
}
//아직 모듈 매겨변수 변경 필요 (bot,message,args,dbID)
