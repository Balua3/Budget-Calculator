
// Select Elements

const balanceElement = document.querySelector(".balance .value");
const incomeTotalElement = document.querySelector(".income .value");
const expenseTotalElement = document.querySelector(".expense .value");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const allElement = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");
const balanceBtn = document.querySelector('.title');
console.log(balanceBtn);

// Select Buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//Input Buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

// Variables
let INITIAL_LIST = [];
let balance = 0, income = 0, outcome = 0;

let DELETE = "delete" , EDIT="edit";

//Event Listeners
expenseBtn.addEventListener("click", function(){
    show_hide(expenseElement, [incomeElement, allElement]);
    elementactive(expenseBtn, [incomeBtn, allBtn]);

})

incomeBtn.addEventListener("click", function(){
    show_hide(incomeElement, [expenseElement, allElement]);
    elementactive(incomeBtn, [expenseBtn, allBtn]);
    // active(incomeBtn);
    // inactive([expenseBtn, allBtn]);
})

allBtn.addEventListener("click", function(){
    show_hide(allElement, [incomeElement, expenseElement]);
    elementactive(allBtn, [incomeBtn, expenseBtn]);
    // active(allBtn);
    // inactive([incomeBtn, expenseBtn]);

})

function show_hide(element_to_show, elements_to_hide){
    element_to_show.classList.remove("hide");
    elements_to_hide.forEach(element => {
        element.classList.add("hide");
    })


}


function elementactive(active, inactive) {
    active.classList.add('active');
    inactive.forEach(element =>{
        element.classList.remove('active');
    })
}

addExpense.addEventListener("click", function(){
    if(!expenseTitle.value || !expenseAmount.value) return;

    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    INITIAL_LIST.push(expense);
    updateUI();
    clearInput([expenseTitle, expenseAmount])
})

addIncome.addEventListener("click", function(){
    if(!incomeTitle.value|| !incomeAmount.value) return;

    let expense = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }
    INITIAL_LIST.push(expense);
    updateUI();
    clearInput([incomeTitle, incomeAmount])
})


function updateUI(){
    income = calculateTotal("income", INITIAL_LIST);
    outcome = calculateTotal("expense", INITIAL_LIST);
    balance = Math.abs(calculateBalance(income, outcome));
    //Update UI
    let sign = (income >= outcome) ? "₹" : "-₹";
    balanceElement.innerHTML = `${sign} ${balance}`;
    expenseTotalElement.innerHTML = `${sign} ${outcome}`;
    incomeTotalElement.innerHTML = `${sign} ${income}`;

    clearElement([expenseList, incomeList, allList]);

    

    INITIAL_LIST.forEach((entry, index)=> {
        if(entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }else if(entry.type == "income"){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });
}

function showEntry(list, type, title, amount, id){

    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: ₹ ${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}


function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}

function calculateTotal(type, list){
    let sum = parseFloat(0);
    list.forEach(entry => {
        if(entry.type == type){
            sum += parseFloat(entry.amount);
        }
    })
    return sum;
}

function calculateBalance(income, outcome){
    return parseFloat(income) - parseFloat(outcome);
}

function clearInput(inputs){
    inputs.forEach(input =>{
        input.value = "";
    })
}

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

function deleteOrEdit(event){
    const targetBtn = event.target;

    const entry = targetBtn.parentNode;

    if(targetBtn.id == DELETE){
        deleteEntry(entry);
    }else if(targetBtn.id == EDIT){
        editEntry(entry);
    }
}


function deleteEntry(entry){
    INITIAL_LIST.splice(entry.id, 1)
    updateUI();
}

function editEntry(entry){
    let ITEM = INITIAL_LIST[entry.id]

    if(ITEM.type == "income"){
        incomeAmount.value = ITEM.amount;
        incomeTitle.value = ITEM.title;

    }else if(ITEM.type == "expense"){
        expenseAmount.value = ITEM.amount;
        expenseTitle.value = ITEM.title;
    }

    deleteEntry(entry);
}

