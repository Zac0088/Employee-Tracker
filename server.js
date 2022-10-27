const inquirer = require("inquirer");
const db = require('./db/connect')
require('console.table');



const promptUser = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please select an option',
        name: 'options',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Role'

        ]
    })
        .then((answer) => {
            switch (answer.options) {
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
                name: 'title',
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
                const sql = `insert into roles (title, salary, department_id)
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
                const sql = `insert into employee (first_name, last_name, id, manager_id)
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

        function updateEmployeeRole() {
            const sql = `select id, first_name, last_name from employee`
            db.query(sql, (err, rows)=> {
                if (err) console.log (err);
                const employee = rows.map(({id, first_name, last_name})=> ({
                    value:id, name: `${first_name} ${last_name}`
                }))
            })
            inquirer.prompt ([{
                type: 'list',
                name: 'employee_id',
                message: 'Which employee would you like to update?',
                choices: employee,
            },
            {
                type: 'list',
                name: 'roles_id',
                message: 'What role would you like to give to the employee?',
                choices: roles,
            }]).then((answers)=> {
                const sql = `update employee set roles_id =?
                where id = ?`;
                const params = [answer.id, answer.roles_id];
                db.query(sql, params, (err, res)=>{
                    if (err) throw err;
                    console.table(res)
                    console.log('Employee role updated')
                    return promptUser();
                })
            });
        }
promptUser();