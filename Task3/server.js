const fs = require("fs");
const yargs = require("yargs");
const id = require("uniqid");
const myCustomer = require("./myModules/customer.js");
const { demandOption } = require("yargs");

yargs.command({
    command: "add",
    builder: {
        id: {
            type: "number",
            default: id(),
        },
        name: {
            type: "string",
            demandOption: true,
        },
        balance: {
            type: "number",
            demandOption: true,
        },
    },
    handler: function(argv) {
        let st = {
            id: argv.id,
            name: argv.name,
            balance: argv.balance,
        };
        myCustomer.addCustomer(st)
    },
});

yargs.command({
    command: "delete",
    builder: {
        id: {
            demandOption: true
        }
    },
    handler: function(argv) {
        let id = argv.id
        myCustomer.deleteCustomer(id)
    },
})

yargs.command({
    command: "edit",
    describe: "edit balance",
    builder: {
        id: {
            demandOption: true
        },
        newBalance: {
            type: "number",
            demandOption: true
        }
    },
    handler: function(argv) {
        let edits = {
            id: argv.id,
            newBalance: argv.newBalance
        }
        myCustomer.editBalance(edits)
    }

})

yargs.argv;