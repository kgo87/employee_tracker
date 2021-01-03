var inquirer = require("inquirer");
const connection = require("./db/connection");
const index = require("./db/index");

const db = require("./db");
const { createPromptModule } = require("inquirer");



function askForAction() {
    inquirer
        .prompt({
            message: "Choose something to do",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENTS",
                "VIEW_ROLES",
                "VIEW_EMPLOYEES",
                "CREATE_ROLE",
                "CREATE_DEPARTMENT",
                "CREATE_EMPLOYEE",
                "UPDATE_ROLE",
                "UPDATE_MANAGER",
                "VIEW_BY_MANAGER",
                "DELETE_DEPARTMENT",
                "DELETE_ROLE",
                "DELETE_EMPLOYEE",
                "VIEW_BUDGET",
                "QUIT"
            ]
        })
        .then(( res ) => {
            switch( res.action ) {
                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    return;
                case "VIEW_ROLES":
                    viewRoles();
                    return;
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    return;
                case "CREATE_ROLE":
                    createRole();
                    return;
                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;
                case "CREATE_EMPLOYEE":
                    createEmployee();
                    return;
                case "UPDATE_ROLE":
                    updateEmpRole();
                    return;
                case "UPDATE_MANAGER":
                    updateManager();
                    return;
                case "VIEW_BY_MANAGER":
                    viewManager();
                    return;
                case "DELETE_DEPARTMENT":
                    deleteDepartment();
                    return;
                case "DELETE_ROLE":
                    deleteRole();
                    return;
                case "DELETE_EMPLOYEE":
                    deleteEmployee();
                    return;
                case "VIEW_BUDGET":
                    viewDepBudget();
                    return;
                default:
                    connection.end();
            }
        });
}

askForAction()


function viewDepartments(){
    db.getDepartments().then((results) => {
        console.table(results);
        askForAction();
    })
}

function viewRoles(){
    db.getRoles().then((results) => {
        console.table(results);
        askForAction();
    })
}

function viewEmployees(){
    db.getEmployees().then((results) => {
        console.table(results);
        askForAction();
    })
}

function createRole(){
    db.getDepartments().then((departments) => {
        console.table(departments)
        inquirer. prompt([
            {
                message: "Choose department",
                type: "list",
                name: "department_id",
                choices: departments.map((department) => ({
                    value:department.id,
                    name: department.name

                })),
                
            },
            {
                type: 'input',
                message: 'What is the title?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary?',
                name: 'salary',
            }
        ]).then((response) => {
            const roleNew = {
                title: response.title,
                salary: Number(response.salary),
                department_id: Number(response.department_id) 
            }
            console.log(roleNew);
            db.insertRoles(roleNew);
            askForAction();

    })
})}


function createDepartment(){
    inquirer. prompt([
        {
            type: 'input',
            message: 'Which department would you like to add?',
            name: 'dep_name',
        }
        ]).then((response) => {
            console.log(response);
            const depNew = {
                name: response.dep_name
            }
            console.log(depNew);
            db.insertDepartments(depNew);
            askForAction();

    })
}

function createEmployee(){
    db.insertEmployee_Roles().then((roles_emp) => {
        inquirer. prompt([
            {
                message: "Choose role",
                type: "list",
                name: "role_id",
                choices: roles_emp.map((role) => ({
                    value:role.role_id,
                    name: role.title

                })),
                
            },
            {
                message: "Choose manager",
                type: "list",
                name: "manager_id",
                choices: roles_emp.map((role) => ({
                    value:role.role_id,
                    name: role.last_name

                })),   
            },

            {
                type: 'input',
                message: 'What is your first name?',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'What is your last name?',
                name: 'last_name',
            }
        ]).then((response) => {
            const empNew = {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: Number(response.role_id), 
                manager_id: Number(response.manager_id)
            }
            console.log(empNew);
            db.insertEmployees(empNew);
            askForAction();

    })
})}

function updateEmpRole() {
    db.insertEmployee_Roles().then((roles_emp) => {
        inquirer. prompt([
            {
                message: "What employee would you like to upodate",
                type: "list",
                name: "emp_id",
                choices: roles_emp.map((role) => ({
                    value:role.id,
                    name: role.last_name

                })),
                
            },
            {
                message: "What new role would you like to assign",
                type: "list",
                name: "role_id",
                choices: roles_emp.map((role) => ({
                    value:role.role_id,
                    name: role.title

                })),   
            },


        ]).then((response) => {
            console.log(response);
            updRole = [
                {
                  role_id: response.role_id
                },
                {
                  id: response.emp_id
                }
              ]
            console.log(updRole);
            db.updateRole(updRole);
            askForAction();

    })
})}

function updateManager() {
    db.insertEmployee_Roles().then((roles_emp) => {
        inquirer. prompt([
            {
                message: "What employee would you like to upodate",
                type: "list",
                name: "emp_id",
                choices: roles_emp.map((role) => ({
                    value:role.id,
                    name: role.last_name +  ", "+ role.first_name

                })),
                
            },
            {
                message: "Select new manager",
                type: "list",
                name: "manager_id",
                choices: roles_emp.map((role) => ({
                    value:role.id,
                    name: role.last_name + ", "+ role.first_name

                })),   
            },


        ]).then((response) => {
            updManager = [
                {
                  manager_id: Number(response.manager_id)
                },
                {
                  id: Number(response.emp_id)
                }
              ]
            console.log(updManager);

            db.updateEmpManager(updManager);
            askForAction();

    })
})}


function viewManager() {
    db.getEmployees().then((roles_emp) => {
        inquirer. prompt([
            {
                message: "Employees of which manager would you like to view",
                type: "list",
                name: "manager_id",
                choices: roles_emp.map((emp) => ({
                    value:emp.id,
                    name: emp.last_name +  ", "+ emp.first_name

                })),
                
            },


        ]).then((response) => {
            const managerID = {
                manager_id: Number(response.manager_id)
            }

            console.log(managerID);

            db.viewByManager(managerID).then((results) => {
                console.table(results)
                askForAction();
            });

    })
})}


function deleteDepartment(){
    db.getDepartments().then((departments) => {
        inquirer. prompt([
            {
                message: 'Which department would you like to delete?',
                type: "list",
                name: "dep_id",
                choices: departments.map((dep) => ({
                    value:dep.id,
                    name: dep.name

                })),
            }
            ]).then((response) => {
                const dep = {
                    id: Number(response.dep_id)
                }
                console.log(dep);
                db.removeDepartment(dep);
                askForAction();

        })
})}

function deleteRole(){
    db.getRoles().then((roles) => {
        inquirer. prompt([
            {
                message: 'Which role would you like to delete?',
                type: "list",
                name: "role_id",
                choices: roles.map((role) => ({
                    value:role.id,
                    name: role.title

                })),
            }
            ]).then((response) => {
                const role = {
                    id: Number(response.role_id)
                }
                console.log(role);
                db.removeRole(role);
                askForAction();

        })
})}

function deleteEmployee(){
    db.getEmployees().then((employees) => {
        inquirer. prompt([
            {
                message: 'Which employee would you like to delete?',
                type: "list",
                name: "emp_id",
                choices: employees.map((emp) => ({
                    value:emp.id,
                    name: emp.last_name + ", " + emp.first_name

                })),
            }
            ]).then((response) => {
                const employee = {
                    id: Number(response.emp_id)
                }
                console.log(employee);
                db.removeEmployee(employee);
                askForAction();

        })
})}



function viewDepBudget(){
    db.getDepartments().then((departments) => {
        inquirer. prompt([
            {
                message: 'Budget of which department would you like to view?',
                type: "list",
                name: "department_id",
                choices: departments.map((dep) => ({
                    value:dep.id,
                    name: dep.name

                })),
            }
            ]).then((response) => {
                console.log(response);
                const dep = {
                    dep_id: Number(response.department_id)
                }
                console.log(dep);
                db.viewDeps_Employee_Roles(dep)
                .then((results => {
                    console.table( results );
                    askForAction();
                })) ;
                

        })
})}




