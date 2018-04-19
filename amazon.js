//dependencies

let mysql = require("mysql");

let inquirer = require("inquirer");

const cTable = require('console.table');

//establish mysql connection
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"

});

//function to connect to mysql
connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    displayProducts();

});

//function that displays a table of current products
function displayProducts() {

    connection.query("SELECT * FROM products", function(err, res) {
        console.log("\n" + "Welcome! These are products available to purchase:" + "\n");

        console.table(res);
        promptPurchase();
    });

}
//inquirer function that prompts the user to purchase a product
function promptPurchase() {


    inquirer.prompt([
        //ask for product id
        {
            type: "input",
            name: "id",
            message: "Enter the ID of the product you would like to buy.",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }

        },
        //ask for quantity
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        //inquirer callback
    ]).then(answers => {

        processOrder(answers);

    });

}

function processOrder(answers) {

    //Check if quantity can be met
    //Read the database where id matches the user input id
    connection.query("SELECT * FROM products WHERE ?", { id: answers.id }, function(err, res) {

        //If the product ID exists
        if (!res[0] === false) {

            //Check stock
            if (answers.quantity > res[0].quantity) {
                console.log(`Sorry, the quantity you requested exceeds the current stock of ${res[0].quantity}. Try placing the order again.`);
                promptPurchase();
            } else {
                //execute outside function that updates the db
                updatedQuantity = res[0].quantity - parseInt(answers.quantity);


                connection.query("UPDATE products SET ? WHERE ?", [
                    { quantity: updatedQuantity },
                    { id: answers.id }

                ], function(err) {
                    if (err) throw err;
                    console.log(`Order of ${res[0].product_name} has been placed succesfully! Total: $${res[0].price}`);
                    connection.end();


                });

            }

            //If product ID doesn't exist
        } else {

            console.log("The product ID you entered does not exist. Try again.");
            promptPurchase();
        }

    });
}