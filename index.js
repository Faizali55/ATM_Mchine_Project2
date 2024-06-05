#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.bgBlueBright("\n\t<<<<< Wellcome To The FaizCode-ATM Machine >>>>>\n"));
console.log(`\t\t ====   ======  ==       ==   `);
console.log(`\t\t||  ||    ||    || =   = ||   `);
console.log(`\t\t ====     ||    ||   =   ||    `);
console.log(`\t\t||  ||    ||    ||       ||   `);
console.log(`\t==========================================`);
let userBalance = Math.floor(Math.random() * 10000);
let myloop = true;
while (myloop) {
    let userInput = await inquirer.prompt([
        {
            name: "userPin",
            type: "input",
            message: "Enter Your Pin:",
        },
        {
            name: "accountType",
            type: "list",
            message: "Select An Option Which You Want To Do:",
            choices: ["Current Account", "Saving Account"],
        },
        {
            name: "transactionType",
            type: "list",
            message: "Select An Transaction Type:",
            choices: ["Fast Cash", "Withdraw Cash", "Balance Inquiry"],
        },
        {
            name: "amount",
            type: "list",
            message: "Select Amount Which You Want To Withdraw:",
            choices: [500, 1500, 2000, 3500, 4500, 6000, 8600, 9000, 10000],
            when(userInput) {
                return userInput.transactionType === "Fast Cash";
            },
        },
        {
            name: "amount",
            type: "number",
            message: "Enter Amount Which You Want To Withdraw:",
            when(userInput) {
                return userInput.transactionType === "Withdraw Cash";
            },
        },
    ]);
    let { userPin, transactionType, amount } = userInput;
    if (userPin && transactionType === "Balance Inquiry") {
        console.log(chalk.yellow(`\nYour Current Balance Is Rs.${userBalance}\n`));
    }
    else if (userPin) {
        if (userBalance > amount) {
            console.log(chalk.greenBright(`\nYour Account Has Been Debited Rs.${amount}.`));
            console.log(chalk.green(`Your Remaining Balance Is Rs.${(userBalance -= amount)}\n`));
        }
        else {
            console.log(chalk.red(`\nUnsufficient Balance !!\n`));
        }
    }
    let moreTransaction = await inquirer.prompt([
        {
            name: "more",
            type: "confirm",
            message: "Do You Want To More Transaction ???",
            default: false,
        },
    ]);
    if (!moreTransaction.more) {
        myloop = false;
        console.log(chalk.blueBright(`\nThank You For Using ATM Machine.\n`));
    }
}
