const Discord = require("discord.js");

const join_database = require('../support/join_database.js');
const join_DB = new join_database();

const messageEmbedClass = require('../support/messageEmbedClass.js');
const meEmbed = new messageEmbedClass();




module.exports = async(oldChannel,newChannel,bot) =>{
	if(!newChannel.guild) return; //exclude creating channel
	
	var channelType;
	const noticeChannel = await oldChannel.guild.channels.cache.find(c=> c.name === 'idbot-notice');

	const connection = await join_DB.get2DataBase();
	// await connection.beginTransaction();
	// const [result,field] = await connection.query('select displayName from channelNames where serverID = ? And (displayName = ? Or parentName = ? )',[oldChannel.guild.id,oldChannel.name,oldChannel.name]);
	// connection.release();
	// if(!result) return;
	// if(oldChannel.type === 'voice') channelType = 'v';
	// else if(oldChannel.type === 'text') channelType = 't';
	// else {
	// 	await connection.beginTransaction();
	// 	const [parentResult] = await connection.query('UPDATE channelNames SET parentName = ? WHERE parentName = ?',[newChannel.name,oldChannel.name]);
	// 	await connection.commit();
	// 	connection.release();
	// 	noticeChannel.send(meEmbed.sendSuccess(bot,`이름을 \`${oldChannel.name}\`에서 \`${newChannel.name}\`으로 성공적으로 설정하였습니다.`));
	// 	return;
	// 	}
	// const param = [newChannel.name,oldChannel.name,channelType,newChannel.guild.id];
	// await connection.beginTransaction();
	// const [parentResult] = await connection.query('UPDATE channelNames SET displayName = ? WHERE displayName = ? AND channelType = ? AND serverID = ?',param);
	// await connection.commit();
	// connection.release();
	// noticeChannel.send(meEmbed.sendSuccess(bot,`이름을 \`${oldChannel.name}\`에서 \`${newChannel.name}\`으로 성공적으로 설정하였습니다.`));
	// // bot.once('channelUpdate', async (oldChannel,newChannel) => {
		
		
	// // });
		
}