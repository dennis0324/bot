const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;


/*
-sendquestion이라는 함수가 너무 복잡하니깐 간소화가 필요함 무조건


-bot과 message가 원래는 기제할 필요가 없었는데 함수가 밖으로 나가면서 요구됨


-deleteArr은 이름은 그대로하거나 관리하는 방식을 바꿔야할 수 있음
-> 근데 생각했던 방법 중에서는 이게 제일 나음(fetch하고 닉네임 비교하면서 할 바에 목록 저장하는게 나을 거 같은데...)


array는 이름을 objectArr로 변경


-cmdString과 cmdArr를 묶는 방법을 좀 찾아야 될듯..
->cmdString을 array화 시키고 cmdArr를 마지막 인덱스에 '배열'채로 넣는다.
그리고 받아서 다시 >cmdString을 넘길때 마지막에 있던 배열을 하나만 정해서 다시 고쳐 넣어주고 또 마지막 인덱스에
배열을 삽입한다.

이렇게 되면 출력할때 약간의 코딩은 들어가겠지만 함수 인수 간소화는 가능.
추가 코드도 그렇게 길지 않을 듯함

-messageEmbedClass를 여기서 활용못하는게 너무 아쉬움
->sendList를 추가해서 그냥 받은 배열 역할 목록 표시하듯이 표시하게 함

-너무 많은 변수가 한번 할 때마다 필요로 함 이게 좋은건지는 모르겠다만...
-> 상황보고 변수의 개수를 약간의 조정이 필요함 한번 읽어보고 중복되는 변수들은 다 정리 요함

*/

const fs = require('fs');

const messsageEmbedClass = require('../support/messageEmbedClass.js');
const meEmbed = new messsageEmbedClass();

const dataSave = require('../support/dataSave.js');


module.exports.run = async (bot, message, args) =>{
	
	async function sendMess(arr,descriptionName,type) {
		var descript = "";
		if(type == 1){

			descript = "```md\n* 명령어 목록:";
			arr.forEach((f,i) => {
				const cmd = f.replace('|','');
				const aliases = f.split('|').shift();
				descript += `\n${i+1}. ${cmd} | ${aliases}`;
			})
			descript += "\n```";

		}
		else if(type == 2){
			arr.forEach((f,i) => {
				descript += `인수: \`${f[0]}\`\n설명: \`${f[1]}\`\n`
			})
		}
		let Sembed = new Discord.MessageEmbed()
		.setColor(Color.mint)
		.setThumbnail(bot.user.displayAvatarURL)
		.setTimestamp()
		.setDescription(`${descriptionName} [options]`)
		.addField("검색 가능한 명령어",`${descript}`,true)
		.addField("1분후 혹은 0을 누르시면 자동 종료됩니다.",true)
		.setFooter("참여 봇",bot.users.displayAvatarURL)

		return message.channel.send(Sembed);	
	}
	
	async function waitReply(message) {
		const filter = m => m.author.id === message.author.id 
		try{
			const reply = await message.channel.awaitMessages(filter, {max : 1,time : 10000, errors: ['time']})
			return reply.first();

		}
		catch(err){
			return -1;
		}
	}
	
	async function decision(deleteArr,objectArr,cmdString){//bot,mess that send on channel,array of all mess,array of objects,
		var reply = await waitReply(message);
		console.log(reply.content);
		if(isNaN(reply)) return [true]; //make sure next input is number
		
		reply = reply.content * 1 - 1;
		if(reply > -2){
			var names = new Array();
			var cmds = new Array();
			var tempArr = new Array();
			// if(!Array.isArray(objectArr)){
			// 	for (const [key, value] of Object.entries(objectArr)) {
			// 		console.log('value: ',value);
			// 		tempArr.push(value);
			// 	}	
			// }
			// else 
			if(Array.isArray(objectArr)){
				console.log('배열이라고 뭐 어쩔래 ');
				tempArr = objectArr.slice();
			}
			tempArr = tempArr[reply];
			console.log('tempArr: ',tempArr);
			decision(deleteArr,tempArr,cmdString);
		}
		
		return [true];
	} 
	
	
    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)
	const commands = dataSave.commandList;
	console.log(typeof([]));
		// if(args[0]) {
		// var command ;
		// if(commands.length < args){
		// 	message.channel.send("```prolog\n없는 선택지입니다. \n```");
		// 	return;
		// }

    if(!args[0]) {
		var deleteArr = new Array();
		var recentMess =  await sendCmdList();
		var cmdString = new Array();
		cmdString.push('--');
		deleteArr.push(message);
		deleteArr.push(recentMess);
		console.log(bot.support);
		var names = bot.support[0];
		var cmds = bot.support[1];
		const returnValue = decision(deleteArr,cmds,cmdString);
		return returnValue;
		
	}	
	return [true];
	
	
	function sendCmdList(){
		var descript = "```md\n* 명령어 목록:";
		commands.forEach((f,i) => {
			descript += `\n${i+1}. ${f.split(".").shift()}`;
		})
		descript += "\n```";

        let Sembed = new Discord.MessageEmbed()
        .setColor(Color.mint)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("검색하고 싶은 명령어의 숫자를 입력하세요")
        .addField("검색 가능한 명령어",`${descript}`,true)
        .setFooter("참여 봇",bot.users.displayAvatarURL)

        return message.channel.send(Sembed);
	}
	
	async function deleteMess(deleteArr){
		console.log(deleteArr.length);
		for await(const mess of deleteArr.map(e => e)){
			mess.delete();
		}
	}
	
	

	
	function showCmd(cmdName){
	if(bot.commands.has(cmdName)){
		let command = bot.commands.get(cmdName);
		var specificHelpEmbed = new Discord.MessageEmbed()
		.setColor(Color.mint)
		.setAuthor("",message.guild.iconURL)
		.setDescription(`봇 수식: ${prefix}\n\n**명령:** ${command.config.name}\n**부가설명:** \`\`\`${command.config.description || "설명 없음"}\`\`\`\n**사용:** ${command.config.usage || "사용 없음"}\n**사용 가능한 역할:** ${command.config.accessableby || "Everyone"}\n**또 다른 명령어:** ${command.config.noalias || command.config.aliases}`)
		return message.channel.send({embed: specificHelpEmbed});
		}			
	}
}

module.exports.config = {
    name: "help",
    aliases: ["h","commands"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--help",
    accessableby:"Everyone",
	indexCount: {
		default: 0
	}
}
//아직 모듈 매겨변수 변경 필요 (bot,message,args,dbID)
