INSERT INTO departments (name)
VALUES ("Accounting"),
       ("Front Desk"),
       ("Bell Man"),
       ("Housekeeping"),
       ("Food and Beverage");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("CPA", 150000.00, 1),
       ("Clerk", 75000.00, 1),
       ("Front Desk Manager", 95000.00, 2),
       ("Clerk", 45000.00, 2),
       ("Head Bell Keep", 35000.00, 3),
       ("Bellman", 30000.00, 3),
       ("House Keeping Manager", 85000.00, 4),
       ("Assistant Manager", 65000.00, 4),
       ("Food and Beverage Manager", 65000.00, 5);

       INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Chav" , 1, NULL),
       ("Drew", "Peterson" , 2, 1),
       ("Bow", "Decker" , 3, NULL),
       ("Kim", "Jones" , 4, 3),
       ("Ben", "Lake" , 5, NULL),
       ("Tim", "Bears" , 6, 5),
       ("kate", "Moon" , 7, NULL),
       ("Karl", "Vail" , 8, 7),
       ("Jim", "Beam" , 9, NULL);