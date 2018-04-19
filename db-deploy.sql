DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NULL,
price DECIMAL(10,2) NULL,
department VARCHAR (50),
quantity INT NULL,
PRIMARY KEY (id)

);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("iPhone 8", 799, "electronics", 20);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("MacBook Pro i7 16GB RAM", 1500, "electronics", 80);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("MacBook Pro i5 4GB RAM with Fancy Apple Sticker", 2800, "electronics", 2);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("Playstation 4 same-thing-but-more-expensive edition", 499, "electronics", 10);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("TA cheatsheet: How to BS your way through any TA job", 19.99, "books", 10);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("How to Nodejs for Dummies", 9.99, "books", 10);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("Life-size motivational Steve Jobs cardboard figure", 999.98, "office supplies", 50);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("Luke Skywalker lightsaber", 15, "toys", 17);

INSERT INTO proucts (product_name, price, department, quantity)
VALUES ("XXL Trojans 69 Pack", 69.69, "lifesavers", 69);

INSERT INTO products (product_name, price, department, quantity)
VALUES ("TRUMP Steaks", 0.01, "disposables", 9999);