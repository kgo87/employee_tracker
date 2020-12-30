var inquirer = require("inquirer");
const connection = require("./db/connection");
const index = require("./db/index");

const db = require("./db");
const { createPromptModule } = require("inquirer");

// db.getDepartments().then((results) => {
//     console.table(results)
// })


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
            console.log(response);
            const title = response.title;
            const newROle = (response.title+", "+ Number(response.salary)+ ", " + Number(response.department_id));
            console.log(newROle);
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
        // console.table(roles)
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
            console.log(response);
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
        // console.table(roles)
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


