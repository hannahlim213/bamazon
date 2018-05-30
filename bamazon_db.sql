DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(19,4),
stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana", "Food", 3, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Puppy", "Animals", 99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Peanut Butter", "Food", 2, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Games", 10, 190);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Counter Strike", "Games", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boxing Gloves", "Apparel", 10, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catan", "Games", 30, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dark Chocolate", "Food", 5, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Toys", 10, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alexa", "Electronics", 45, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods", "Electronics", 90, 130);

