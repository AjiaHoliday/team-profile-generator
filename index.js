const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatePage = require('./src/generate-page');

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
                name: 'name',
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
        .then(({name, id, email, role}) => {
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
                        manager.push(new Manager(name, id, email, officeNumber));

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
                        engineer.push(new Engineer(name, id, email, github));
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
                        intern.push(new Intern(name, id, email, school));
                        if (anotherEmployee) {
                            return Prompt();
                        };
                    });
            };
        });
};

const writeFile = fileContent => {
    fs.writeFile('./dist/index.html', fileContent, err => {
        if (err) {
            console.log(err);
            return;
        }else {
            console.log("Your team profile has been successfully created! Please check out the index.html");
        };
    });
}

Prompt()
    .then(teamData=> {
        return generatePage(employeeArr)
    })
    .then(pageHTML => {
        return writeFile(pageHTML)
    })

    