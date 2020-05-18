const inquirer = require("inquirer");
const fs = require("fs");
const style = require("./src/ProfileTemplate")

const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Manager = require("./lib/manager")
const Intern = require("./lib/intern")

let finalTeamArray = [];


function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Manager's name:",
        },
        {
            type: "number",
            name: "id",
            message: "Employee ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Email:",
        },

        {
            type: "number",
            name: "officeNumber",
            message: "Office Number:",
        },
    ])

        .then(function (data) {
            const name = data.name
            const id = data.id
            const email = data.email
            const officeNumber = data.officeNumber
            const teamMember = new Manager(name, id, email, officeNumber)
            finalTeamArray.push(teamMember)
            addTeamMembers();
        });

}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            name: "MemberData",
            message: "Would you like to add more team?",
            choices: ["Add Engineer", "Add Intern", "Team is Finished"],
        }
    ])

        .then(function (data) {

            switch (data.MemberData) {
                case "Add Engineer":
                    addEngineer();
                    break;

                case "Add Intern":
                    addIntern();
                    break;
                case "Team is Finished":
                    compileTeam();
                    break;
            }
        });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Engineer's name:",
        },
        {
            type: "number",
            name: "id",
            message: "Engineer ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Engineer Email:",
        },
        {
            type: "input",
            name: "github",
            message: "Engineer's Github:",
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = data.id
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            finalTeamArray.push(teamMember)
            addTeamMembers()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Intern's name:",
        },
        {
            type: "number",
            name: "id",
            message: "Intern ID:",
        },
        {
            type: "input",
            name: "email",
            message: "Intern Email:",
        },
        {
            type: "input",
            name: "school",
            message: "Intern School:",
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = data.id
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            finalTeamArray.push(teamMember)
            addTeamMembers()
        });

};

function compileTeam() {
    console.log("Information Logged! HTML created!")

const htmlArray = []
const htmlBeginning = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team</title>
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet">
    <style>
    ${style}
   </style>
</head>
<body>
    <div class="banner-bar">
        <h1>Team</h1>
    </div>
    <div class="card-container">
    `
    htmlArray.push(htmlBeginning);

    for (let i = 1; i < finalTeamArray.length; i++) {
        let object = `
        <div class="member-card">
            <div class="card-top">
                <h2>${finalTeamArray[i].name}</h2>
                <h2>${finalTeamArray[i].title}</h2>
            </div>
            <div class="card-bottom">
                <p>Employee ID: ${finalTeamArray[i].id}</p>
                <p>Email: <a href="mailto:${finalTeamArray[i].email}">${finalTeamArray[i].email}</a></p>
        `
        if (finalTeamArray[i].officeNumber) {
            object += `
            <p>${finalTeamArray[i].officeNumber}</p>
            `
        }
        if (finalTeamArray[i].github) {
            object += `
            <p>GitHub: <a href="https://github.com/${finalTeamArray[i].github}">${finalTeamArray[i].github}</a></p>
            `
        }
        if (finalTeamArray[i].school) {
            object += `
            <p>School: ${finalTeamArray[i].school}</p>
            `
        }
        object += `
        </div>
        </div>
        `
        htmlArray.push(object)
    }

    const htmlEnd = `
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./dist/team.html`, htmlArray.join(""), function (err) {
        
    })
}

addManager()