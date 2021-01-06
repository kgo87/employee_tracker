DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);



USE employee_trackerDB;
INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 2),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Accountant", 125000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 1, 0),
("Mike", "Chan", 2, 1),
("Ken", "Maring", 3, 2),
("Tom", "Allen", 4, 1);

INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance");


-- Creating a combined tables from all three initial tables.
-- This table will be used in the query to view the department's budget.
USE employee_trackerDB;
CREATE TABLE overall AS 
SELECT role.id, role.title, role.salary, employee.role_id, employee.id as emp_id, 
employee.first_name, employee.last_name, department.id as dep_id, department.name FROM employee 
JOIN role ON role.id=employee.role_id JOIN department on department.id = role.department_id;