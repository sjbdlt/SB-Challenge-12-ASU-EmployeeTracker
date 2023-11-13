const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const api = require('./routes/index');
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



init();

function init(){
    startmenu();
}

function startmenu(){

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
                    name: "Update a employee role?",
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

function getlistofdepartments(){

    let requesttype = {
        method: 'get',
    };

    //TODO SEE IF BETTER WAY TO DISPLAY DATA IN TABLE VIEW WITHOUT INDEX AND WHAT URL TO CALL FROM HERE
    fetch('http://localhost:3001/api/department', requesttype) 
        .then(response => { 
            if (response.ok) { 
            return response.json(); 
            } else { 
            throw new Error('API request failed'); 
            } 
        }) 
        .then(data => { 
            console.table(data); 
            startmenu();
        }) 
        .catch(error => {    
            console.error(error); 
    });
}

function getlistofroles(){

    let requesttype = {
        method: 'get',
    };
    
    //TODO SEE IF BETTER WAY TO DISPLAY DATA IN TABLE VIEW WITHOUT INDEX AND WHAT URL TO CALL FROM HERE
    fetch('http://localhost:3001/api/role', requesttype) 
        .then(response => { 
            if (response.ok) { 
            return response.json(); 
            } else { 
            throw new Error('API request failed'); 
            } 
        }) 
        .then(data => { 
            console.table(data); 
            startmenu();
        }) 
        .catch(error => {    
            console.error(error); 
    });
}



function getlistofemployees(){
  
    let requesttype = {
        method: 'get',
    };
    
    //TODO SEE IF BETTER WAY TO DISPLAY DATA IN TABLE VIEW WITHOUT INDEX AND WHAT URL TO CALL FROM HERE
    fetch('http://localhost:3001/api/employee', requesttype) 
        .then(response => { 
            if (response.ok) { 
              return response.json(); 
            } else { 
              throw new Error('API request failed'); 
            } 
        }) 
        .then(data => { 
            console.table(data); 
            startmenu();
        }) 
        .catch(error => {    
            console.error(error); 
    });
}    

function postadddepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departname",
            message: "What department would you like to add?",
        }
    ])
    .then(answers => {
        console.log(answers.departname);
   
        let name = answers.departname

        const dept = {name}

        console.log(dept);

        const requesttype = {
            method: 'POST',
            Headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dept),
        };
           
        //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
        fetch('http://localhost:3001/api/department', requesttype) 
            .then(response => { 
                if (response.ok) { 
                  return response.json(); 
                } else { 
                  throw new Error(response.json()); 
                } 
            }) 
            .then(data => { 
                console.log(data); 
                startmenu();
            }) 
            .catch(error => {    
                console.error(error); 
        });
    })

}

function postaddrole(){

    //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER WITH A VALUE
    let departmentls = ""
    db.query(`Select id as value, name from departments`, function(err, res){
        if (err) throw err;
        departmentls = res;
        console.table(res);
       // console.log(departmentls);
    })

    inquirer.prompt([
        {
            type: "input",
            name: "rolname",
            message: "What role would you like to add?",
        },
        {
            type: "input",
            name: "rolsalary",
            message: "What salary of the role?",
        },
        {
            type: "list",
            name: "roldepartment",
            message: "What department is the role in?",
            choices: departmentls,
        }
    ])
    .then(answers => {   
        let rolname = answers.rolname
        let rolsalary = answers.rolsalary
        let roldepartment = answers.roldepartment

        const role = {
            rolname,
            rolsalary,
            roldepartment
        }

        console.log(role);

        const requesttype = {
            method: 'POST',
            Headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(role),
        };
           
        //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
        fetch('http://localhost:3001/api/role', requesttype) 
            .then(response => { 
                if (response.ok) { 
                  return response.json(); 
                } else { 
                  throw new Error(response.json()); 
                } 
            }) 
            .then(data => { 
                console.log(data); 
                startmenu();
            }) 
            .catch(error => {    
                console.error(error); 
        });
    })

}



function postaddemployee(){

    //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER WITH A VALUE
    let rolesls = ""
    db.query(`Select id as value, title as name from roles`, function(err, res){
        if (err) throw err;
        rolesls = res;
        console.table(res);
       // console.log(departmentls);
    })

    //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER
    let managerls = ""
    db.query(`Select id as value, CONCAT(IFNULL(first_name,""), ' ', IFNULL(last_name,"")) as name from employees`, function(err, res){
        if (err) throw err;
        managerls = res;
        console.table(res);
       // console.log(departmentls);
    })
    inquirer.prompt([
        {
            type: "input",
            name: "emplyfirstname",
            message: "What employees first name?",
        },
        {
            type: "input",
            name: "emplylastname",
            message: "What employees last name?",
        },
        {
            type: "list",
            name: "emplyrole",
            message: "What employees role?",
            choices: rolesls,
        },
        {
            type: "list",
            name: "emplymgr",
            message: "Who is the employees manager?",
            choices: managerls,
        }
    ])
    .then(answers => {
   
        let emplyfirstname = answers.emplyfirstname
        let emplylastname = answers.emplylastname
        let emplyrole = answers.emplyrole
        let emplymgr = answers.emplymgr

        const emply = {
            emplyfirstname,
            emplylastname,
            emplyrole,
            emplymgr
        }

        console.log(emply);

        const requesttype = {
            method: 'POST',
            Headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emply),
        };
           
        //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
        fetch('http://localhost:3001/api/employee', requesttype) 
            .then(response => { 
                if (response.ok) { 
                  return response.json(); 
                } else { 
                  throw new Error(response.json()); 
                } 
            }) 
            .then(data => { 
                console.log(data); 
                startmenu();
            }) 
            .catch(error => {    
                console.error(error); 
        });
    })

}


function updateemployeerole (){


    //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER
    let emplyls = ""
    db.query(`Select id as value, CONCAT(IFNULL(first_name,""), ' ', IFNULL(last_name,"")) as name from employees`, function(err, res){
        if (err) throw err;
        emplyls = res;
        console.table(res);
    // console.log(departmentls);
    })

    //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER WITH A VALUE
    let rolesls = ""
    db.query(`Select id as value, title as name from roles`, function(err, res){
        if (err) throw err;
        rolesls = res;
        console.table(res);
    // console.log(departmentls);
    })

    inquirer.prompt([
        {
            type: "list",
            name: "selemplyname",
            message: "Which employees role do you want to update?",
            choices: [],
        },
        {
            type: "input",
            name: "selemplyrole",
            message: "What role do you want to assigned selected employee?",
            choices: []
        }
    ])
    .then(answers => {

        let selectedemply = answers.selemplyname
        let selectedrole = answers.selemplyrole

        const emply = {
            selectedrole
        }

        console.log(emply);

        const requesttype = {
            method: 'POST',
            Headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(emply),
        };
        
        //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
        fetch(`http://localhost:3001/api/employee/updaterole/${selectedemply}`, requesttype) 
            .then(response => { 
                if (response.ok) { 
                return response.json(); 
                } else { 
                throw new Error(response.json()); 
                } 
            }) 
            .then(data => { 
                console.log(data); 
                startmenu();
            }) 
            .catch(error => {    
                console.error(error); 
        });
    })

}

function updateemployeesmanager(){

     //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER
     let emplyls = ""
     db.query(`Select id as value , CONCAT(IFNULL(first_name,""), ' ', IFNULL(last_name,"")) as name from employees`, function(err, res){
         if (err) throw err;
         emplyls = res;
         console.table(res);
     // console.log(departmentls);
     })
 
      
     inquirer.prompt([
         {
             type: "list",
             name: "selemplyname",
             message: "Which employees manger do you want to update?",
             choices: [],
         },
         {
             type: "input",
             name: "selemplymanger",
             message: "Which manager do you want to assigned selected employee?",
             choices: []
         }
     ])
     .then(answers => {
 
         let selectedemply = answers.selemplyname
         let selemplymanger = answers.selemplymanger
 
         const emply = {
             selemplymanger
         }
 
         console.log(emply);
 
         const requesttype = {
             method: 'POST',
             Headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(emply),
         };
         
         //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
         fetch(`http://localhost:3001/api/employee/updatemanager/${selectedemply}`, requesttype) 
             .then(response => { 
                 if (response.ok) { 
                 return response.json(); 
                 } else { 
                 throw new Error(response.json()); 
                 } 
             }) 
             .then(data => { 
                 console.log(data); 
                 startmenu();
             }) 
             .catch(error => {    
                 console.error(error); 
         });
     })
  
}

function getlistofemployeesbymanager(){

     //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER
     let emplyls = ""
     db.query(`Select id as value, CONCAT(IFNULL(first_name,""), ' ', IFNULL(last_name,"")) as name from employees`, function(err, res){
         if (err) throw err;
         emplyls = res;
         console.table(res);
     // console.log(departmentls);
     })
 
      
     inquirer.prompt([
         {
             type: "list",
             name: "selmngrname",
             message: "Which manager's employees do you want to see?",
             choices: [],
         }
     ])
     .then(answers => {
 
         let selmngrname = answers.selmngrname
 
         console.log(selmngrname);
 
         const requesttype = {
             method: 'GET',
             Headers: {'Content-Type': 'application/json'}
         };
         
         //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
         fetch(`http://localhost:3001/api/employee/listbymanager/${selmngrname}`, requesttype) 
             .then(response => { 
                 if (response.ok) { 
                 return response.json(); 
                 } else { 
                 throw new Error(response.json()); 
                 } 
             }) 
             .then(data => { 
                 console.table(data); 
                 startmenu();
             }) 
             .catch(error => {    
                 console.error(error); 
         });
     })
  
}

function getlistofemployeesbydepartment(){
    
      //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER WITH A VALUE
    let departmentls = ""
    db.query(`Select id as value, name from departments`, function(err, res){
        if (err) throw err;
        departmentls = res;
        console.table(res);
       // console.log(departmentls);
    })
   
        
    inquirer.prompt([
        {
            type: "list",
            name: "seldepartment",
            message: "Which department's employees do you want to see?",
            choices: [],
        }
    ])
    .then(answers => {
   
        let seldepartment = answers.seldepartment
   
        console.log(seldepartment);
   
        const requesttype = {
            method: 'GET',
            Headers: {'Content-Type': 'application/json'}
        };
           
        //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
        fetch(`http://localhost:3001/api/employee/listbydepartment/${seldepartment}`, requesttype) 
            .then(response => { 
                if (response.ok) { 
                return response.json(); 
                } else { 
                throw new Error(response.json()); 
                } 
            }) 
            .then(data => { 
                console.table(data); 
                startmenu();
            }) 
            .catch(error => {    
                console.error(error); 
        });
    })
    
  }
  
function getlistdepartmentsbudget(){
    let requesttype = {
        method: 'get',
    };

    //TODO SEE IF BETTER WAY TO DISPLAY DATA IN TABLE VIEW WITHOUT INDEX AND WHAT URL TO CALL FROM HERE
    fetch('http://localhost:3001/api/department/budget', requesttype) 
        .then(response => { 
            if (response.ok) { 
            return response.json(); 
            } else { 
            throw new Error('API request failed'); 
            } 
        }) 
        .then(data => { 
            console.table(data); 
            startmenu();
        }) 
        .catch(error => {    
            console.error(error); 
    });
}

function deletedepartment(){
    

      //TODO FIGURE OUT HOW TO GET A LIST FROM A TABLE TO SHOW AS CHOICES FOR A PROMPT QUESTION IN INQUIRER WITH A VALUE
      let departmentls = ""
      db.query(`Select id as value, name from departments`, function(err, res){
          if (err) throw err;
          departmentls = res;
          console.table(res);
         // console.log(departmentls);
      })
     
          
      inquirer.prompt([
          {
              type: "list",
              name: "seldepartment",
              message: "Which department's employees do you want to see?",
              choices: [],
          }
      ])
      .then(answers => {
     
          let seldepartment = answers.seldepartment
     
          console.log(seldepartment);
     
          const requesttype = {
              method: 'DELETE',
              Headers: {'Content-Type': 'application/json'}
          };
             
          //TODO FIX POST NOTHING GOING OVER FOR JSON VALUES AND WHAT URL TO CALL FROM HERE
          fetch(`http://localhost:3001/api/department/${seldepartment}`, requesttype) 
              .then(response => { 
                  if (response.ok) { 
                  return response.json(); 
                  } else { 
                  throw new Error(response.json()); 
                  } 
              }) 
              .then(data => { 
                  console.table(data); 
                  startmenu();
              }) 
              .catch(error => {    
                  console.error(error); 
          });
      })
      
}