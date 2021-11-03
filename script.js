const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'flower', amount: -20},
//     {id: 2, text: 'salary', amount: 300},
//     {id: 3, text: 'book', amount: -10},
//     {id: 4, text: 'camera', amount: 150},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));



let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//add transactions
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        //add entry to the transaction array
        transactions.push(transaction);
        //add the entry to the DOm
        addTransactionDOM(transaction);
        //update the values
        updateValues();

        updateLocalStorage();

        //then clear the inputs
        text.value = '';
        amount.value = '';
    }
}

//generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000);
}


//add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
}


//update the balance, income and expense

function updateValues() {
    //get the amounts
    const amounts = transactions.map(transaction => transaction.amount);
    //total up the amounts
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //get the income
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    //get the expense
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}


//remve transaction by ID
function removeTransaction(id) {
    //filter the transaction, take each transaction and check if the transaction is not equal to the id passed in, then move it to the array
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}


//update local storage transactions 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


//init app
 function init() {
     list.innerHTML = '';

     transactions.forEach(addTransactionDOM);
     updateValues();
    
 }
 init();

 form.addEventListener('submit', addTransaction);