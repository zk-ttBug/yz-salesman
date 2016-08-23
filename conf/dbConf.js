var localhostDBOptions = {
    "host" : "localhost", 
    "port" : 3306,  
    "user" : "root",  
    "password" : ""
};

var onlineDBOptions = {
	"host" : "120.25.219.170", 
    "port" : 3306,  
    "user" : "shopadmin",  
    "password" : "Laoguanghui1234567"
}

var dataBase = "shopadmin";

module.exports = {
	dataBase: dataBase,
	dbOptions: onlineDBOptions
}