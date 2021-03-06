var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// connection to mysql

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

// connection to mysql server and database
connection.connect(function (err) {
    if (err) throw err;

    // fun start function after connection is made
    start()
})

var purchasedItemId;
var guestPurchaseStock;
var itemPrice;


// start function displays the products table
function start() {
    connection.query("SELECT * FROM products", function (err, results) {

        // if(err) throw err;
        var table = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [10, 20, 20, 10, 20]
        });

        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity],
            );
        }
        console.log(table.toString());

        purchase();
    })
}

// function to update database when user makes a purchase
function purchase() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the item you want to purchase?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many units would you like?"
        }
    ])
        .then(function (answer) {

            // capture guest item id and convert to int
            purchasedItemId = parseInt(answer.item_id);
            // console.log(purchasedItemId)

            // capture stock quantity purchased and convert to int
            guestPurchaseStock = parseInt(answer.stock_quantity)

            // connect to sql for whole table
            connection.query(
                "SELECT stock_quantity, price, product_name FROM products WHERE ?", { item_id: purchasedItemId }, function (err, res) {
                    // console.log(res)
                    // capture product name of selected item id
                    var selectedProductName = res[0].product_name;

                    // capture current stock quantity
                    var currentStock = parseInt(res[0].stock_quantity);

                    // total price
                    var totalPrice = guestPurchaseStock * res[0].price;

                    if (err) {
                        console.log(err)

                        // current stock must not be less than stock of guest purchase
                    } else if (currentStock < guestPurchaseStock) {
                        console.log("Sorry, not enough items in inventory.")

                        // if current stock is more than stock of guest purchase, update the sql
                    } else if (currentStock > guestPurchaseStock) {
                        console.log("You have purhcased " + guestPurchaseStock + " units " + "of " + selectedProductName + "\n Total price is $" + totalPrice +"\n Thank you!")

                        
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: currentStock - guestPurchaseStock,
                                },
                                {
                                    item_id: purchasedItemId
                                }
                            ]
                        )

                        start();

                        // console.log("Total price is " + totalCost())
                    } // end of if statement
                } // end of sql connection for whole table
            ) // end of connection query
        })
}

function table() {
    connection.query("SELECT * FROM products", function (err, results) {

        // if(err) throw err;
        var table = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [10, 20, 20, 10, 20]
        });

        for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity],
            );
        }
        console.log(table.toString());
        connection.end();
    })
}
