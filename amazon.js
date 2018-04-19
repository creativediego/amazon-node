//dependencies

let sql = require("mysql");

let inquirer = require("inquirer");

//establish mysql connection
let db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: "",
    database: bamazon

});

//function to connect to mysql
db.connect(function(err) {
    if (err) throw error;
    console.log(`connected as id ${connection.threadID}`);
});
//function that displays a table of current products
function displayProducts() {

    db.query("SELECT * FROM products", function(err, res) {


    });

}
//inquirer function that prompts the user to purchase a product
//ask for product id
//ask for quantity

//inquirer callback
//if quantiy in answers is equal or less than the input, proceed with the...
//update function that decreses the product quantity 
//and displays a successful checkout message, including total purchase cost
//else display a message that the quantity is insufficient
//recursively prompt the user again for product
//bonus: if quantity is 0, prompt the user for a new product; else, just prompt for quantity