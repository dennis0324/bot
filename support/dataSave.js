const join_database = require('./join_database.js');
const join_DB = new join_database();

class dataSave{
	
	static roleList; //guild.id,roles
	static serverSetting; //guildid,serverSetting,value
	static channelList; //getting all from channelNames
	static commandList; //getting
	static serverList; //getting server id that bot is handling
	static settingList; //getting setting column from database
	static personalSett;
	static perSettList;
	
	static setChannel(channelNamesQuery){
		this.channelList = channelNamesQuery;
	}
	static setRole(testing){
		this.roleList = testing;
	}
	
	static setServer(serverSettingQuery){
		this.serverSetting = serverSettingQuery;
	}
	static settingList(settingList){
		this.settingList = settingList;
	}
	static setCommandList(commandList){
		this.commandList = commandList;
	}
	static setServerList(serverList){
		this.serverList = serverList;
	}
	static setPersonalSett(personalSett){
		this.personalSett = personalSett;
	}
	static setperSettList(perSettList){
		this.perSettList = perSettList;
	}
	
	static async updateData(){
		const connection = await join_DB.get2DataBase();
		await connection.beginTransaction();
		[this.channelList] = await connection.query('SELECT * FROM channelNames');
		[this.roleList] = await connection.query('SELECT roles, serverID FROM roleNames');
		[this.serverSetting] = await connection.query('SELECT * FROM serverSetting');
		[this.serverList] = await connection.query('SELECT distinct serverID FROM channelNames');
		[this.settingList] = await connection.query('SHOW COLUMNS FROM serverSetting');
		[this.personalSett] = await connection.query('SELECT * FROM personalSetting');
		[this.perSettList] = await connection.query('SHOW COLUMNS FROM personalSetting');
		connection.release();
	}
}

module.exports = dataSave;