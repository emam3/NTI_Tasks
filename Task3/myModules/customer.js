const fs = require("fs")


const dataReturn = () => {
    let customers
    try { // b make sure en el data de array
        customers = JSON.parse(fs.readFileSync('customers.json'))
        if (!Array.isArray(customers)) throw new Error() // el data de array ? lw yes fa ok 
    } catch { // lw no make data = empty array 
        customers = []
    }
    return customers // data is array
}


class Customer {
    // make sure of your data first
    static addCustomer = (st) => {
        try { // try add el data
            let customers = dataReturn()
            console.log(customers)
            customers.push(st)
            console.log(customers)
            fs.writeFileSync('./customers.json', JSON.stringify(customers))
        } catch { // error ? let's see
            console.log("faild adding data")
        }
    }

    static deleteCustomer = (id) => { // not working ¯\_(ツ)_/¯ 
        // i tried using array.filter but it didnt work either
        let customers = dataReturn()
        try {
            customers.forEach(c => {
                return c["id"] != id
            })
            fs.writeFileSync('./customers.json', JSON.stringify(customers))
        } catch {
            console.log("the ID desnt even exist")
        }
    }

    static editBalance = (customerData) => {
        let customers = dataReturn()
        customers.forEach(c => {
            if (c["id"] == customerData["id"]) {
                c["balance"] = customerData["newBalance"]
            }
        })
        fs.writeFileSync('./customers.json', JSON.stringify(customers))
    }
}

module.exports = Customer