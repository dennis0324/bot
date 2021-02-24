const mysql = require("mysql2/promise");


function joinDataBase(){};

var pool = mysql.createPool({
		host : `us-cdbr-east-02.cleardb.com`,
		user : `beeba3b53d8b34`,
		password : `10d4db29`,
		database : `heroku_3cdd4905f680c6a`	
	})

var proto = joinDataBase.prototype;

proto.get2DataBase = () =>{
	return pool.getConnection(conn => conn);
}

module.exports = joinDataBase;
