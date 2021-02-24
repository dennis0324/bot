const join_database = require('./join_database.js');
const join_DB = new join_database();

class dataSave{
	
	static roleList; //guild.id,roles
	static serverSetting; //guildid,serverSetting,value
	static channelList; //getting all from channelNames
	static commandList; //getting
	
	static setChannel(channelNamesQuery){
		this.channelList = channelNamesQuery;
	}
	static setRole(testing){
		this.roleList = testing;
	}
	
	static setServer(serverSettingQuery){
		this.serverSetting = serverSettingQuery;
	}
	static setCommandList(commandList){
		this.commandList = commandList;
	}
	
	
	static async updateData(){
		const connection = await join_DB.get2DataBase();
		await connection.beginTransaction();
		[this.channelList] = await connection.query('SELECT * FROM channelNames');
		[this.roleList] = await connection.query('SELECT roles, serverID FROM roleNames');
		[this.serverSetting] = await connection.query('SELECT * FROM serverSetting');

		connection.release();
	}
}

module.exports = dataSave;