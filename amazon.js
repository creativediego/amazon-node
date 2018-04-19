//dependencies

let mysql = require("mysql");

let inquirer = require("inquirer");

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
        console.log("Products available to purchase:")
        console.log("-------------------------------------")
        for (let i = 0; i < res.length; i++) {
            console.log(`Item: ${res[i].product_name} | Product ID: ${res[i].id} | Quantity: ${res[i].quantity} Price: ${res[i].price} | Department: ${res[i].department}`);
        }
        console.log("-------------------------------------")
            //connection.end();
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
                    return true
                } else {
                    return false
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
                    return true
                } else {
                    return false
                }
            }
        }
        //inquirer callback
    ]).then(answers => {


        //Check if quantity can be met
        //Read the database where id matches the user input id
        connection.query("SELECT quantity FROM products WHERE ?", { id: answers.id }, function(err, res) {

            //If the product ID exists
            if (!res[0] === false) {

                //Check stock
                if (answers.quantity > res[0].quantity) {
                    console.log(`Sorry, the quantity you requested exceeds the current stock of ${res[0].quantity}. Try placing the order again`)
                    promptPurchase();
                } else {
                    //execute outside function that updates the db
                    function processOrder() {



                    }
                    console.log("Order placed!")
                    promptPurchase();
                }

                //If product ID doesn't exist
            } else {

                console.log("The product ID you entered does not exist.")
                promptPurchase();
            }

        });

    });




    //if quantiy in answers is equal or less than the input, proceed with the...
    //update function that decreses the product quantity 
    //and displays a successful checkout message, including total purchase cost
    //else display a message that the quantity is insufficient
    //recursively prompt the user again for product
    //bonus: if quantity is 0, prompt the user for a new product; else, just prompt for quantity


}