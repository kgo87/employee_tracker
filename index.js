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
            console.log(title);
            const newROle = (response.title+", "+ Number(response.salary)+ ", " + Number(response.department_id));
            console.log(newROle);
            const roleNew = {
                title: response.title,
                salary: Number(response.salary),
                department_id: Number(response.department_id) 
            }
            console.log(roleNew);
            db.insertRoles(roleNew);

    })
    // askForAction();



})}
