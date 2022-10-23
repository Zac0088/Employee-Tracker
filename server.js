const inquirer = require("inquirer");
const db = require('./db/connect')
const table = require('console.table');

async function viewDepartments() {
    const departments= await db.query('Select id, name from departments');
    console.table(departments);
    NextAction();
};

async function viewRoles() {
    const roles = await db.query('SELECT roles.id, title, salary, name')
}