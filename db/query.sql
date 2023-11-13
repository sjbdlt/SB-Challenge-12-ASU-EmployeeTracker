USE company_db;

Select * From departments;

Select * From roles;

Select * From employees;

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