const connection = require("./connection");
module.exports = {
    getDepartments() {
        return connection.query("SELECT * FROM department")
    },
    getRoles() {
        return connection.query("SELECT * FROM role")
    },
    getEmployees() {
        return connection.query("SELECT * FROM employee")
    },

    insertRoles(data) {
        return connection.query("INSERT INTO role SET ?", data)
    },

    insertDepartments(data) {
        return connection.query("INSERT INTO department SET ?", data)
    },

    insertEmployees(data) {
        return connection.query("INSERT INTO employee SET ?", data)
    }


}


