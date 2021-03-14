const Discord = require("discord.js");
const Color = require("../colours.json");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;

const join_database = require('../support/join_database.js');
const joinDB = new join_database();

const dataSave = require('../support/dataSave.js');

/*
event that catch when discord user status, or activities changes
*/
module.exports =async(oldPresence, newPresence,bot) =>{
    // bot.once("presenceUpdate", async () => {
       
    //     });
	try{
		const channelNames = dataSave.channelList;
		const serverSettings = dataSave.serverSetting;
		 if (newPresence.member.user.bot) return; //if bot change presence return
		const guildSetting = serverSettings.find(setting => setting.serverID === oldPresence.guild.id);
		if(!guildSetting.defaultChannel && newPresence.activities.length <= 0) {
			return;
		}
		else if(guildSetting.defaultChannel && newPresence.activities.length <= 0) {
			try{
				const defaultChl = newPresence.client.channels.cache.find(c => c.name === guildSetting.defaultChannel && c.type === 'voice');
				if(newPresence.member.voice.channel)
					newPresence.member.voice.setChannel(defaultChl);
			}
			catch(err){}
			return;
		}
		newPresence.activities.forEach(async activity => {
			if( activity.type == "PLAYING"){ //need to change to Playing,STREAMING, etc. except custom_status using temp beacause of military
				console.log("presenceUpdate: ",newPresence.user.tag);
				console.log("presenceUpdate: ",activity.name);
				const channelInfo = channelNames.find(q => q.gameName === activity.name && oldPresence.guild.id === q.serverID);
				if(!channelInfo) {
					console.log('게임을 채널에서 찾을 수 없습니다.');
					return;
				}

				// let startingGame = newPresence.client.channels.cache.find(c => c.name&& c.type !== "category");
				// console.log("presenceUpdate: ", startingGame.name);
				// if(startingGame) {
				//     console.log("presenceUpdate: find game... searching for user's voice channel connection");
				// }
				// else{
				//     concole.log("nothing has found");
				//     return;
				// }
				bot.channels.cache.forEach(c => {
					if(c.type != "category"){//to exclude category channels
						if(channelInfo.displayName === c.name){
							if(newPresence.member.voice.channel){
								console.log("detected in voice channel");
								const targetChl = newPresence.client.channels.cache.find(channel => channel.name == channelInfo.displayName);
								const chkRole = newPresence.member.roles.cache.find(role => {
									console.log(role.name, ':', channelInfo.roles);
									if(role.name === `${channelInfo.roles}-pro`)
										return true;
									
									
								});
								console.log(chkRole);
								
								try{
									if(chkRole)
										newPresence.member.voice.setChannel(targetChl)								
								}
								catch(err){}
							}
						}
					}
				});  


			}
		});
	}
	catch(err){}
	
}


