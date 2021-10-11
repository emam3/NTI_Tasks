const customersForm = document.querySelector("#customersForm");

const heads = [
    { inForm: "ID", inView: "ID" },
    { inForm: "customerName", inView: "Customer name" },
    { inForm: "customerBalance", inView: "Customer balance" },
];

// Direct save to the local storage
// whatever was the data , it will be saved
// which is wrong . so , we have to handel it
saveDataToLC = (data) => {
    localStorage.setItem("customers", JSON.stringify(data));
};

getAllDataFromLC = () => {
    let allData;
    try {
        allData = JSON.parse(localStorage.getItem("customers"));
        if (!Array.isArray(allData)) throw new Error();
    } catch (e) {
        allData = [];
    }
    return allData;
};

const customers = getAllDataFromLC();

// handelling data to save it .. or not to
if (customersForm) {
    // if the form exist
    // then
    customersForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let customerArray = {};
        heads.forEach((item) => {
            // save the entered data in customersArray
            if (item.inForm == "ID") {
                customerArray["ID"] = Date.now();
            } else {
                customerArray[item.inForm] = this.elements[item.inForm].value;
            }
        });
        customers.push(customerArray);
        saveDataToLC(customers);
        this.reset()
        window.location.replace('index.html')
    });
}

const createElements = (
    element,
    parent,
    txt = "",
    classes = "",
    attributes = ""
) => {
    let el = document.createElement(element);
    parent.appendChild(el);
    if (txt != "") el.textContent = txt;
    if (classes != "") el.classList = classes;
    return el;
};

const table = document.querySelector("#tableData");

const drawTable = (customers) => {
    let thead = createElements("thead", table);
    let tr = createElements("tr", thead);
    heads.forEach((h) => {
        createElements("th", tr, h.inView);
    });
    createElements("th", tr, "actions");
    let tbody = createElements("tbody", table);
    if (customers.length == 0) {
        let tr = createElements("tr", tbody);
        let td = createElements("td", tr, "No data available");
        td.colSpan = "3";
    } else {
        customers.forEach((customer, i) => {
            let tr = createElements("tr", tbody);
            heads.forEach(h => {
                createElements("td", tr, customer[h.inForm])
                let td = createMyOwnElements('td', tr)
                let delbtn = createMyOwnElements('button', td, "delete", "btn btn-danger mx-3")
                delbtn.addEventListener('click', function() { deleteItem(i) })
                let editBtn = createMyOwnElements('button', td, "Edit", "btn btn-warning")
                editBtn.addEventListener('click', function(e) {
                    editForm.classList.remove('d-none')
                    editForm.elements.taskTitle.value = customers[i].taskTitle
                    editForm.elements.taskContent.value = customers[i].taskContent
                    editForm.elements.taskDetails.value = customers[i].taskDetails
                    console.log(i)
                    localStorage.setItem('editIndex', i)
                })
            })
        });
    }
};

if (table) {
    drawTable(customers);
}