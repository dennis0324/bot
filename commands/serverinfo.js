const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot,message,args) =>{
    let sEmbed = new Discord.RichEmbed()
    .setColor(Color.red_pastel)
    .setTitle("ServerInfo")
    .setDescription("testing description")
    .setAuthor(`${message.guild.name} Inifo`,'https://cdn.discordapp.com/attachments/627451820087836682/664890024399208448/id.png')
    .addField("**Guild Name**",`${message.guild.name}`,true)
    .addField("**Guild Owner:**",`${message.guild.owner}`,true)
    .addField("**Member Count:**",`${message.guild.memberCount}`,true)
    .addField("**Role Count:**",`${message.guild.roles.size}`,true)
    .setFooter(`TestBot | Footer`,bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    aliases: ["si","serverdesc"],
    description: "필요한 역할을 부여받을 수 있습니다.",
    usage: "!serverinfo",
    accessableby:"Everyone"
}

