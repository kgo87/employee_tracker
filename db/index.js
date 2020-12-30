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
    },

    insertEmployee_Roles(data) {
        return connection.query("SELECT role.id, role.title, employee.role_id, employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.first_name, employee.last_name FROM employee INNER JOIN role ON role.id=employee.role_id", data)
    },
    updateRole(data) {
        return connection.query("UPDATE employee SET ? WHERE ?", data)
    },
    updateEmpManager(data) {
        return connection.query("UPDATE employee SET ? WHERE ?", data)
    },
    viewByManager(data){
        return connection.query("SELECT * FROM employee WHERE ?", data)
    },
    removeDepartment(data) {
        return connection.query("DELETE FROM department WHERE ?", data)
    },
    removeRole(data) {
        return connection.query("DELETE FROM role WHERE ?", data)
    },
    removeEmployee(data) {
        return connection.query("DELETE FROM employee WHERE ?", data)
    }


}


