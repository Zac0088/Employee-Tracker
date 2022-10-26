INSERT INTO department (id, department_name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Accounting'),
       (4, 'Legal'),
       (5, 'Reception');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Accountant', 10000, 3),
       (2, 'Software Engineer', 90000, 2),
       (3, 'Senior Counsel', 120000, 4),
       (4, 'Receptionist', 65000, 5),
       (5, 'Head of Sales', 80000, 1),
       (6, 'Junior Software Engineer', 60000, 2);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (1, 'Naruto', 'Uzamaki', 4, 2),
       (2, 'Rock', 'Lee', 5, 1),
       (3, 'Sasuke', 'Uchiha', 1, null),
       (4, 'Shikamaru', 'Nara', 3, 4),
       (5, 'Sakura', 'Haruno', 2, null),
       (6, 'Kakashi', 'Hatake', 6, null),
       (7, 'Hinata', 'Hyuga', 2, 3);