const Discord = require("discord.js");
const bot = new Discord.Client();
var testrole;
const token = "NjY0ODg0NDU4MDI1MTIzODUz.XhdkGQ.oiGffoMMP_BwZOXoCc2bfcvRoO8";

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
    return message.channel.send(
      "You dont have permission to perform this command!"
    );
  }

  let rMember = message.mention.member.first()
};
bot.on("ready", () => {
  const guild = bot.guilds.get("472692644129275904");
  const role = guild.roles.find(u => u.name === "Player");
  testrole = role;
  console.log("testing: " + role.id.toString());
});

bot.on("message", msg => {
  if (msg.content === "--join") {
    msg.member.addRole(testrole.id);
    msg.reply("hi " + msg.author);
  }
});
bot.on("message", msg => {
  if (msg.content === "--leave") {
    msg.member.removeRole(testrole.id);
    msg.reply("hi " + msg.author);
  }
});
bot.login(token);
