const inquirer = require("inquirer");
const db = require('./db/connect')
require('console.table');

db.connect((err) => {
    if (err) throw err;
    return promptUser();
})

const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please select an option',
        name: 'options',
        choices: [
            'View departments',
            'View Roles',
            'View Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Role'

        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case "Add an Employee":
                    addEmployee();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "view Employees":
                    viewEmployees();
                    break;

                case "View Departments":
                    viewDepartment();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "Update Role":
                    updateEmployeeRole();
                    break;
                }
            })
        }
        
        function viewDepartment(){
            const sql = `select * FROM department`;
            db.query(sql, (err, res) => {
                if (err) throw err;
                console.table(res);
                console.log("Viewing Departments")
                return promptUser();
            });
        }

        function viewRoles() {
            const sql = `select * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) throw err;
                console.table(res);
                console.log('Viewing roles')
                return promptUser();
            });
        }

        function viewEmployees() {
            const sql = `select * from employee`;
            db.query(sql, (err, res)=>{
                if (err) throw err;
                console.table(res);
                console.log("Viewing Employees")
                return promptUser();
            });
        }
