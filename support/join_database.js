const mysql = require("mysql2/promise");


function joinDataBase(){};

var pool = mysql.createPool({
		host : `${process.env.DB_SITE}`,
		user : `${process.env.DB_ID}`,
		password : `${process.env.DB_PASS}`,
		database : `heroku_3cdd4905f680c6a`	
	})

var proto = joinDataBase.prototype;

proto.get2DataBase = () =>{
	return pool.getConnection(conn => conn);
}

module.exports = joinDataBase;
