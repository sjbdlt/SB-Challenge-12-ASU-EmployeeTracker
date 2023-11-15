const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const api = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  }
);

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



const deptls = [];
function departlookup() {
    db.query(`Select id as value, name from departments where name is not null`, function(err, res){
        if (err) throw err;
        for (var i =0; i < res.length; i++){
            deptls.push(res[i])
        }
    })
    return deptls;
}



const emplyls = [];
function employeelookup() {
    db.query(`Select id as value, CONCAT(IFNULL(first_name,""), ' ', IFNULL(last_name,"")) as name from employees`, function(err, res){
        if (err) throw err;
        for (var i =0; i < res.length; i++){
            emplyls.push(res[i])
        }
    })
    return emplyls;
}


const rolels = [];
function roleslookup() {
    db.query(`Select id as value, IFNULL(title, "") as name from roles`, function(err, res){
        if (err) throw err;
        for (var i =0; i < res.length; i++){
            rolels.push(res[i])
        }
    })
    return rolels;
}



init();

function init(){
    startmenu();
    roleslookup();
    departlookup();
    employeelookup();
}

function startmenu(){

//Populate my list choices
  

    inquirer.prompt([
        {
            type: "list",
            name: "mainitemselected",
            message: "What would you like to do?",
            choices: [
                {   
                    name: "View all departments?",
                    value: "listofdepartments"
                },
                {   
                    name: "View all roles?",
                    value: "listofroles"
                },
                {   
                    name: "View all employees?",
                    value: "listofemployees"
                },
                {   
                    name: "Add a department?",
                    value: "adddepartment"
                },
                {   
                    name: "Add a role?",
                    value: "addrole"
                },
                {   
                    name: "Add a employee?",
                    value: "addemployee"
                },
                {   
                    name: "Update employees role?",
                    value: "updateemployeerole"
                },
                {   
                    name: "Update employees manager?",
                    value: "updateemployeesmanager"
                },
                {   
                    name: "View employees by manager?",
                    value: "listofemployeesbymanager"
                },
                {   
                    name: "View employees by department?",
                    value: "listofemployeesbydepartment"
                },  
                {   
                    name: "View total budget by department?",
                    value: "listdepartmentsbudget"
                },
                {   
                    name: "Delete a deprtment?",
                    value: "deletedepartment"
                }, 
            ]      
        }   
    ]).then(({mainitemselected}) => {
        //console.log(mainitemselected);
        if (mainitemselected == "listofdepartments"){
            //console.log('1');
            getlistofdepartments();
        }else if (mainitemselected == "listofroles"){
            //console.log('2');
            getlistofroles();
        }else if (mainitemselected == "listofemployees"){
            //console.log('3');
            getlistofemployees();
        }else if (mainitemselected == "adddepartment"){
            //console.log('4');
            postadddepartment();
        }else if (mainitemselected == "addrole"){
            //console.log('5');
            postaddrole();
        }else if (mainitemselected == "addemployee"){
            //console.log('6');
            postaddemployee();
        }else if (mainitemselected == "updateemployeerole"){
            //console.log('7');
            updateemployeerole();
        }else if (mainitemselected == "updateemployeesmanager"){
            //console.log('8');
            updateemployeesmanager();
        }else if (mainitemselected == "listofemployeesbymanager"){
            //console.log('9');
            getlistofemployeesbymanager();
        }else if (mainitemselected == "listofemployeesbydepartment"){
            //console.log('10');
            getlistofemployeesbydepartment()
        }else if (mainitemselected == "listdepartmentsbudget"){
            //console.log('11');
            getlistdepartmentsbudget();
        }else if (mainitemselected == "deletedepartment"){
            //console.log('12');
            deletedepartment();
        }
    })

}


//Display a list of all departments
function getlistofdepartments(){

    const sql = db.query("Select id, name From departments", 
    function (err, res) {
        if (err) res.status(400).json({ error: err.message });
        console.table(res);
        startmenu();
    })  
   
}

//Display a list of all roles
function getlistofroles(){

    const sql = db.query("Select roles.id, title, FORMAT(salary, 2) as salary, departments.name as department From roles INNER JOIN departments on departments.id = department_id", 
    function (err, res) {
        if (err) res.status(400).json({ error: err.message });        
        console.table(res);
        startmenu();    
    })  
}

//Display a list of all employees
function getlistofemployees(){
  
    const sql = db.query("Select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, IFNULL(e2.first_name, '') as manager_first_name, IFNULL(e2.last_name, '') as manager_last_name From employees Left Join roles on role_id = roles.id Left join departments on department_id = departments.id Left join employees as e2 on e2.ID = employees.manager_id", 
    function (err, res) {
        if (err) res.status(400).json({ error: err.message });
        console.table(res);
        startmenu();    
    })  
}    

//Add a new department
function postadddepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departname",
            message: "What is the name of the department?",
        }
    ])
    .then(answers => {
        let deptname = answers.departname;

        const sql = db.query("INSERT INTO departments SET ?", {
            name: deptname,
        }, function (err, res) {
            if (err) res.status(400).json({ error: err.message });
        })
        console.log(`${sql.values.name} department was successfully added!`)
       
    })
    .then(() => {
        startmenu();
    })

}

//Add a new role
function postaddrole(){
    inquirer.prompt([
        {
            type: "input",
            name: "rolname",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "rolsalary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "roldepartment",
            message: "What department does the role belong to?",
            choices: deptls,
        }
    ])
    .then(answers => {   
        let rolname = answers.rolname;
        let rolsalary = answers.rolsalary;
        let roldepartment = answers.roldepartment;
           
        const sql = db.query("INSERT INTO roles SET ?", {
            title: rolname,
            salary: rolsalary,
            department_id: roldepartment,
        }, function (err, res) {
            if (err) res.status(400).json({ error: err.message });
        })
        console.log(`${sql.values.title} role was successfully added!`)       

    })
    .then(() => {
        startmenu();
    })
}

//Add a new employee
function postaddemployee(){  
    
    inquirer.prompt([
        {
            type: "input",
            name: "emplyfirstname",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "emplylastname",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "emplyrole",
            message: "What is the employee's role?",
            choices: rolels,
        },
        {
            type: "list",
            name: "emplymgr",
            message: "Who is the employee's manager?",
            choices: emplyls,
        }
    ])
    .then(answers => {
                        
        let emplyfirstname = answers.emplyfirstname;
        let emplylastname = answers.emplylastname;
        let emplyrole = answers.emplyrole;
        let emplymgr = answers.emplymgr;
                
        const sql = db.query("INSERT INTO employees SET ?", {
            first_Name: emplyfirstname,
            last_Name: emplylastname,
            role_id: emplyrole,
            manager_id: emplymgr,
        }, function (err, res) {
            if (err) res.status(400).json({ error: err.message });
        })
        console.log(`${sql.values.first_Name} ${sql.values.last_Name} employee was successfully added!`)          
    })
    .then(() => {
        startmenu();
    })
}

//Update employeees role
function updateemployeerole (){

   inquirer.prompt([
        {
            type: "list",
            name: "selemplyname",
            message: "Which employee's role do you want to update?",
            choices: emplyls,
        },
        {
            type: "list",
            name: "selemplyrole",
            message: "Which role do you want to assign the selected employee?",
            choices: rolels,
        }
    ])
    .then(answers => {
        
        let selectedemply = answers.selemplyname;
        let selectedrole = answers.selemplyrole;
        
        const sql = db.query("UPDATE employees SET ? Where ?", [{
           role_id: selectedrole,}, {id: selectedemply}], 
           function (err, res) {
            if (err) res.status(400).json({ error: err.message });
        })
        console.log(`Employee's role was successfully updated!`)  
    })
    .then(() => {
        startmenu();
    })
}

//Update employees manager
function updateemployeesmanager(){

     inquirer.prompt([
         {
             type: "list",
             name: "selemplyname",
             message: "Which employee's manger do you want to update?",
             choices: emplyls,
         },
         {
             type: "list",
             name: "selemplymanger",
             message: "Which manager do you want to assign the selected employee?",
             choices: emplyls,
         }
     ])
     .then(answers => {
         let selectedemply = answers.selemplyname
         let selemplymanger = answers.selemplymanger
                 
         const sql = db.query("UPDATE employees SET ? Where ?", [{
            manager_id: selemplymanger,}, {id: selectedemply}], 
            function (err, res) {
             if (err) res.status(400).json({ error: err.message });
         })
         console.log(`Employee's manager was successfully updated!`)  
     })
     .then(() => {
        startmenu();
    })
}

//Display a list of employees by manager
function getlistofemployeesbymanager(){
    inquirer.prompt([
         {
             type: "list",
             name: "selmngrname",
             message: "Which manager's employees do you want to see?",
             choices: emplyls,
         }
     ])
     .then(answers => {
        let selmngrname = answers.selmngrname;

        const sql = db.query("Select employees.first_name, employees.last_name From employees where ?", {
            manager_id: selmngrname
        },
        function (err, res) {
        if (err) res.status(400).json({ error: err.message });   
        console.table(res);            
        })

    })
    .then(ansers => {
        startmenu();
    })
}

//Display a list of employees by department
function getlistofemployeesbydepartment(){
   inquirer.prompt([
        {
            type: "list",
            name: "seldepartment",
            message: "Which department's employees do you want to see?",
            choices: deptls,
        }
    ])
    .then(answers => {
   
        let seldepartment = answers.seldepartment

        const sql = db.query("SELECT employees.id, first_name, last_name FROM employees inner join roles on roles.id = employees.role_id Where ?", {
            department_id: seldepartment
        },
        function (err, res) {
        if (err) res.status(400).json({ error: err.message });
        console.table(res);   
        })
    })
    .then(ansers => {
        startmenu();
    })
  }

  //Display a list with the budget for each department
function getlistdepartmentsbudget(){
    
    const sql = db.query("SELECT name as department, FORMAT(sum(salary),2) FROM departments inner join roles on roles.department_id = departments.id group by name",
    function (err, res) {
    if (err) res.status(400).json({ error: err.message });
    console.table(res);
    startmenu();    
    })  
}

//Delete a department
function deletedepartment(){

    inquirer.prompt([
          {
              type: "list",
              name: "seldepartment",
              message: "Which department do you want to delete?",
              choices: deptls,
          }
      ])
      .then(answers => {     
          let seldepartment = answers.seldepartment;   

          const sql = db.query("Delete from departments Where ?", {
            id: seldepartment}, 
            function (err, res) {
             if (err) res.status(400).json({ error: err.message });
         })
         console.log(`Department was successfully deleted!`)       
      })
      .then(() => {
        startmenu();
    })
}

