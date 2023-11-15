USE company_db;
/**/

Select id, name From departments;

Select roles.id, title, FORMAT(salary, 2) as salary, departments.name as department From roles INNER JOIN departments on departments.id = department_id;

Select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, employees.manager_id, e2.id, e2.first_name, e2.last_name From employees Left Join roles on role_id = roles.id Left join departments on department_id = departments.id Left join employees as e2 on e2.ID = employees.manager_id;

Select
*
From employees
Left Join roles on role_id = roles.id
Left join departments on department_id = departments.id;

Select
employees.id,
employees.first_name,
employees.last_name,
roles.title,
CONCAT(IFNULL(e2.first_name,""), ' ', IFNULL(e2.last_name,"")) as Manager,
roles.salary,
departments.name as department,
IFNULL(employees.manager_id, "") as manager_id
From employees
Left Join roles on role_id = roles.id
Left join departments on department_id = departments.id
Left join employees as e2 on e2.ID = employees.manager_id;


Select roles.id, title,  salary, departments.name From roles INNER JOIN departments on departments.id = department_id;


Select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, CONCAT(IFNULL(e2.first_name,""), ' ', IFNULL(e2.last_name,"")) as Manager From employees Left Join roles on role_id = roles.id Left join departments on department_id = departments.id Left join employees as e2 on e2.ID = employees.manager_id Where employees.manager_id = "1"
