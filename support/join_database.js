const mysql = require("mysql2/promise");


// const connection = mysql.createConnection({
// 	host : `${process.env.DB_SITE}`,
// 	user : `${process.env.DB_ID}`,
// 	password : `${process.env.DB_PASS}`,
// 	database : `heroku_3cdd4905f680c6a`
// });


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
