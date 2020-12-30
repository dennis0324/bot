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
module.exports.run = async (bot, message, args) =>{
    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        message.delete();
        let command = args[0];
        console.log(`${command}`);
        if(bot.commands.has(command)){
            console.log(`counting testing num of if`);
            command = bot.commands.get(command);
            var specificHelpEmbed = new Discord.MessageEmbed()
            .setColor(Color.mint)
            .setAuthor("",message.guild.iconURL)
            .setDescription(`봇 수식: ${prefix}\n\n**명령:** ${command.config.name}\n**부가설명:** ${command.config.description || "설명 없음"}\n**사용:** ${command.config.usage || "사용 없음"}\n**사용 가능한 역할:** ${command.config.accessableby || "Everyone"}\n**또 다른 명령어:** ${command.config.noalias || command.config.aliases}`)
            return message.channel.send({embed: specificHelpEmbed});
        }
    }

    if(!args[0]){
        let embed = new Discord.MessageEmbed()
        .setColor(Color.mint)
        .setThumbnail(bot.user.displayAvatarURL)
        .setAuthor("",message.guild.iconURL())
        .setDescription(`${message.author.username}님! 개인 메세지를 확인해주세요`)

        let Sembed = new Discord.MessageEmbed()
        .setColor(Color.mint)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription("무엇을 도와드릴까요?")
        .addField(`${}`)
        .setFooter("참여 봇",bot.users.displayAvatarURL)

        message.channel.send(embed).then(m => m.delete({timeout: 2000}));

        message.author.send(Sembed);
        
        message.author.send(" \n1.roles\n2.testing2\n3.testing3");
        
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h","commands"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "--help",
    accessableby:"Everyone"
}
