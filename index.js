const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/page-template');
const writeFile = require('./src/generate-site');

let manager = [];
let engineer = [];
let intern = [];
let employeeArr = {manager, engineer, intern};

function Prompt() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: "What is this employee's role?",
                choices: ['Manager', 'Engineer', 'Intern']
            },
            {
                type: 'text',
                name: 'employeeName',
                message: "What is the Employee's Name?"
            },
            {
                type: 'text',
                name: 'id',
                message: "What is this employee's ID number"
            },
            {
                type: 'text',
                name: 'email',
                message: "What is the employee's email address?"
            }
        ])
        .then(({employee, id, email, role}) => {
            if(role === "Manager") {
                return inquirer
                    .prompt([
                        {
                            type: 'text',
                            name: 'officeNumber',
                            message: "What is this manager's office number?"
                        },
                        {
                            type: 'confirm',
                            name: 'anotherEmployee',
                            message: "Would you like to enter another employee?",
                            default: true
                        }
                    ])
                    .then(({officeNumber, anotherEmployee}) => {
                        manager.push(new Manager(employuee, id, email, officeNumber));

                        if (anotherEmployee) {
                            return Prompt();
                        }
                    });
            } else if (role === "Engineer") {
                return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'github',
                        message: "What is the Engineer's Github username?"
                    },
                    {
                        type:'confirm',
                        name:'anotherEmployee',
                        message: "What you like to add another employee?",
                        default: true
                    }])
                    .then(({github, anotherEmployee}) => {
                        engineer.push(new Engineer(employee, id, email, github));
                        if (anotherEmployee) {
                            return Prompt();
                        }
                    });
            } else {
                return inquirer
                    .prompt([{
                        type:'text',
                        name:'school',
                        message: "What is the Intern's school?"
                    },
                    {
                        type:'confirm',
                        name:'anotherEmployee',
                        message: "What you like to add another employee?",
                        default: false
                    }])
                    .then(({school, anotherEmployee}) => {
                        intern.push(new Intern(employee, id, email, school));
                        if (anotherEmployee) {
                            return Prompt();
                        };
                    });
            };
        });
    };

Prompt()
    .then(teamData=> {
        return generatePage(employeeArr)
    })
    .then(pageHTML => {
        return writeFile(pageHTML)
    })