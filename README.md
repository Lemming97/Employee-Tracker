# Employee-Tracker


![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)

## Description 
Employee Tracker is a content-management system (CMS). It is command-line application that manages a company's employee database, using Node.js, Inquirer, and MySQL.



## Table of Contents
* [Installation](#installation)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Usage](#usage)
* [Links](#links)
* [Screenshots](#screenshots)



## Installation 

Clone the repository from GitHub and download Node. Install mysql, console.table, express, inquirer, npm node mysql2, and enter your own password in the connection.js file.
 
## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Usage
To  create new notes in the right-hand column while being able to delete them from the left-hand column.


## Links
<p>To View the Live Application: <a href="https://nameless-mountain-77177.herokuapp.com/"> Click Here</a></p>


## Screenshots
<br><img src="./public/assets/images/Screen2.png" alt="screenshot of starting page" width="350"/>
<br><img src="./public/assets/images/Screen1.png" alt="screenshot of note taking page" width="350"/>





