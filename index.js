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
                type: 'input',
                name: 'name',
                message: "What is the Employee's Name?",
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log("Please enter employee name.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is this employee's ID number",
                validate: idInput => {
                    if(idInput) {
                        return true;
                    } else {
                        console.log("Please enter employee ID.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employee's email address?",
                validate: email => {
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    if (valid) {
                        return true;
                    } else {
                        console.log ('Please enter an email!')
                        return false; 
                    }
                }
            }
        ])
        .then(({name, id, email, role}) => {
            if(role === "Manager") {
                return inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'officeNumber',
                            message: "What is this manager's office number?",
                            validate: officeInput => {
                                if  (isNaN(officeInput)) {
                                    console.log ('Please enter an office number!')
                                    return false; 
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            type: 'confirm',
                            name: 'anotherEmployee',
                            message: "Would you like to enter another employee?",
                            default: false
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
                        message: "What is the Engineer's Github username?",
                        validate: githubInput => {
                            if (githubInput ) {
                                return true;
                            } else {
                                console.log ("Please enter the employee's github username!")
                            }
                        }
                    },
                    {
                        type:'confirm',
                        name:'anotherEmployee',
                        message: "What you like to add another employee?",
                        default: false
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
                        message: "What is the Intern's school?",
                        validate: schoolInput => {
                            if (schoolInput) {
                                return true;
                            } else {
                                console.log ("Please enter the intern's school.")
                            }
                        }
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

    