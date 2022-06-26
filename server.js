const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

//error for database
db.connect(err => {
  if (err) throw err;
  mainMenu();
});



const mainMenu = () => {
  return inquirer.prompt([{
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update An Employee's Role",
        "End"
      ]
    }])
    .then(userSelect => {
      switch (userSelect.menu) {
        case 'View Departments':
          selectDepartments();
          break;
        case 'View Roles':
          selectRoles();
          break;
        case 'View Employees':
          selectEmployees();
          break;
        case 'Add Department':
          promptAddDepartment();
          break;
        case 'Add Role':
          promptAddRole();
          break;
        case 'Add Employee':
          promptAddEmployee();
          break;
        case 'Update An Employee Role':
          promptUpdateRole();
          break;
        default:
          process.exit();

      }
    })
};



const selectDepartments = () => {
  connection.query(
    'SELECT * FROM department;',
    (err, results) => {
      console.table(results);
      mainMenu();
    });
};


const selectRoles = () => {
  connection.query(
    'SELECT * FROM role;',
    (err, results) => {
      console.table(results);
      mainMenu();
    }
  )
};


const selectEmployees = () => {
  connection.query(
    "SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;",
    (err, results) => {
      console.table(results);
      mainMenu();
    }
  )
};





const promptAddDepartment = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: 'Name the department you would like to add?',
      validate: departmentName => {
        if (departmentName) {
          return true;
        } else {
          console.log('Please enter the name of your department!');
          return false;
        }
      }
    }])
    .then(name => {
      connection.promise().query("INSERT INTO department SET ?", name);
      selectDepartments();
    })
}




const promptAddRole = () => {

  return connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    )
    .then(([departments]) => {
      let departmentChoices = departments.map(({
        id,
        name
      }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt(
          [{
              type: 'input',
              name: 'title',
              message: 'Enter the name of your title (Required)',
              validate: titleName => {
                if (titleName) {
                  return true;
                } else {
                  console.log('Please enter your title name!');
                  return false;
                }
              }
            },
            {
              type: 'list',
              name: 'department',
              message: 'Which department are you from?',
              choices: departmentChoices
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter your salary (Required)',
              validate: salary => {
                if (salary) {
                  return true;
                } else {
                  console.log('Please enter your salary!');
                  return false;
                }
              }
            }
          ]
        )
        .then(({
          title,
          department,
          salary
        }) => {
          const query = connection.query(
            'INSERT INTO role SET ?', {
              title: title,
              department_id: department,
              salary: salary
            },
            function (err, res) {
              if (err) throw err;
            }
          )
        }).then(() => selectRoles())

    })
}




const promptAddEmployee = (roles) => {

  return connection.promise().query(
      "SELECT R.id, R.title FROM role R;"
    )
    .then(([employees]) => {
      let titleChoices = employees.map(({
        id,
        title

      }) => ({
        value: id,
        name: title
      }))

      connection.promise().query(
        "SELECT E.id, CONCAT(E.first_name,' ',E.last_name) AS manager FROM employee E;"
      ).then(([managers]) => {
        let managerChoices = managers.map(({
          id,
          manager
        }) => ({
          value: id,
          name: manager
        }));

        inquirer.prompt(
            [{
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name (Required)',
                validate: firstName => {
                  if (firstName) {
                    return true;
                  } else {
                    console.log('Please enter the employees first name!');
                    return false;
                  }
                }
              },
              {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name (Required)',
                validate: lastName => {
                  if (lastName) {
                    return true;
                  } else {
                    console.log('Please enter the employees last name!');
                    return false;
                  }
                }
              },
              {
                type: 'list',
                name: 'role',
                message: 'What is the employees role?',
                choices: titleChoices
              },
              {
                type: 'list',
                name: 'manager',
                message: 'Who is the employees manager?',
                choices: managerChoices
              }

            ])
          .then(({
            firstName,
            lastName,
            role,
            manager
          }) => {
            const query = connection.query(
              'INSERT INTO employee SET ?', {
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager_id: manager
              },
              function (err, res) {
                if (err) throw err;
                console.log({
                  role,
                  manager
                })
              }
            )
          })
          .then(() => selectEmployees())
      })
    })
}







const promptUpdateRole = () => {

  return connection.promise().query(
      "SELECT R.id, R.title, R.salary, R.department_id FROM role R;"
    )
    .then(([roles]) => {
      let roleChoices = roles.map(({
        id,
        title

      }) => ({
        value: id,
        name: title
      }));

      inquirer.prompt(
          [{
            type: 'list',
            name: 'role',
            message: 'Which role do you want to update?',
            choices: roleChoices
          }]
        )
        .then(role => {
          console.log(role);
          inquirer.prompt(
              [{
                  type: 'input',
                  name: 'title',
                  message: 'Enter the name of your title (Required)',
                  validate: titleName => {
                    if (titleName) {
                      return true;
                    } else {
                      console.log('Please enter your title name!');
                      return false;
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'Enter your salary (Required)',
                  validate: salary => {
                    if (salary) {
                      return true;
                    } else {
                      console.log('Please enter your salary!');
                      return false;
                    }
                  }
                }
              ]
            )
            .then(({
              title,
              salary
            }) => {
              const query = connection.query(
                'UPDATE role SET title = ?, salary = ? WHERE id = ?',
                [
                  title,
                  salary,
                  role.role
                ],
                function (err, res) {
                  if (err) throw err;
                }
              )
            })
            .then(() => mainMenu())
        })
    });

};

mainMenu();




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});