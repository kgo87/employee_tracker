var mysql = require("mysql");
const util = require("util");
// var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "kated14101987eco",
  database: "employee_trackerDB"
});


connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // askForAction();
});

connection.query = util.promisify(connection.query);


module.exports = connection;