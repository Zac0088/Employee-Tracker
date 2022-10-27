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

        const addDepartment = () =>{
            inquirer.prompt({
                type: 'text',
                name: 'department_name',
                messaage: 'Name of Department'
            })
            .then((answer)=> {
                const sql =`Insert into department (department_name)
                values (?)`;
                db.query(sql, answer.department_name, (err, res)=>{
                    if (err) throw err;
                    console.table(res)
                    console.log('New Department Created')
                    return promptUser();
                });
            });
        }

        const addRole = () => {
            inquirer.prompt ([{
                type: 'text',
                name: 'salary',
                message: 'Name of new Role?',
            },
            {
                type: 'text',
                name: 'salary',
                message: 'New Roles Salary?',
            },
            {
                type: 'text',
                name: 'department_id',
                message: 'New departments ID?'
            }]).then((answer) =>{
                const sql = `insert into job (title, salary, department_id)
                values (?,?,?)`;
                const params = [answer.title,answer.salary, answer.department_id];
                db.query(sql, params, (err, res)=>{
                    if (err) throw err;
                    console.table(res)
                    console.log('New role created')
                    return promptUser();
                })
            });
            
        }

        const addEmployee = () => {
            inquirer.prompt ([{
                type: 'Text',
                name: 'first_name',
                message: 'Employees first name?',
            },
            {
                type: 'text',
                name: 'last_name',
                message: 'Employees last name?',
            },
            {
                type: 'text',
                name: 'roles_id',
                message: 'Employee role ID?'
            },
            {
                type: 'text',
                name: 'manager_id',
                message: 'Employees manager ID?',
            
            }]).then((answer)=> {
                const sql = `insert into employee (first_name, last_name, job_id, manager_id)
                values (?,?,?,?)`;
                const params = [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id];
                db.query(sql, params, (err, res)=>{
                    if (err) throw err;
                    console.table(res)
                    console.log('New Employee created')
                    return promptUser();
                })
            });
        }
        
