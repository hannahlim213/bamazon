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

// purchase function "What is the ID of the item you want to purchase?"

function purchase() {
    inquirer.prompt([
        {
            name: "purchase",
            type: "input",
            message: "What is the ID of the item you want to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like?"
        }
    ])
        .then(function (answer) {
            // get info of chosen item
            var chosenItem;
            var initialQuantity = results[i].stock_quantity;
            var chosenQuantity = results[i].stock_quantity;

            // for (var i = 0; i < results.length; i++) {
            //     if (answer.choice === results[i].item_id) {
            //         chosenQuantity = results[i].stock_quantity;
            //     }
            // }
            
            console.log (chosenItem);

            // minus the user quanatity input from database
            var newQuantity;
            
            newQuantity = initialQuantity - chosenQuantity;
            // update database
            connection.query(
                "UPDATE products SET stock_quantity ? WHERE ?",
                [
                    {
                       stock_quantity: newQuantity
                    },
                    {
                        id: chosenItem
                    }
                ]
            )

        })
}

// // quantity function "How many units would you like?"
// function quantity() {
// inquirer.prompt([
//     {
//         name: "qunatity",
//         type: "input",
//         message: "How many units would you like?"
//     }
// ]).then(function(answer) {
//     // get quantity
//     var chosenQuantity;

//     //update databse
   
// })
// }