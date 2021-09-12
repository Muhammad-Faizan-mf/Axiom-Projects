//Get DOM elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

//get transaction from memory
let transactions = [
    // {
    //     id:1,
    //     reason:"salary",
    //     amount: 5000
    // }
];

//function to display transaction in the history section
function displayTransaction(transaction){
    //fetch data from local storage


    //check is transactoin is credit or debit
    const type = transaction.amount >0 ?'+':'-';
    //create a list item for the transaction
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span>        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" >X</button>

        
        
    `;
    list.appendChild(transactionLI);


};
//function to update all balances

function updateBalance(){
    //new array that only have transaction amount
    const transactionAmounts = transactions.map( transaction => transaction.amount);
    
    const totalBalance = transactionAmounts.reduce( (acc, amount) => ( acc += amount), 0 );

    // let debitBalance = 0;
    
    //calculate credit balance
    const creditBalance = transactionAmounts.filter(amount => amount>0).reduce((acc,amount) => (acc+=amount),0
    );
    //calculate debit balance
    const debitBalance = transactionAmounts.filter(amount => amount<0).reduce((acc,amount) => (acc+=amount),0);
    
    //update all values in the DOM
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText= `$${debitBalance}`;
};
function saveData(transaction){
    localStorage.setItem('id', transaction.id);
    localStorage.setItem('reason', transaction.reason);
    localStorage.setItem('amount', transaction.amount);
    

};
function createID(){
    return Math.floor(Math.random() * 100000000000 );

}
function addTransaction(e){
    //stop page from reloading
    e.preventDefault();
    //check the data entered is valid
    if(reason.value.trim()=='' || amount.value.trim() === ''){
        //display error message
        alert("Provide valid reason and amount.");
    }
    else{
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        //push the new details into transactions array
        transactions.push(transaction);
        //save data to local storage
        saveData(transaction);
        //display the new added transaction in history
        displayTransaction(transaction);
        //update overall balance 
        updateBalance();
        //clear form
        reason.value= '';
        amount.value= '';
    }
};
function deleteTransaction(id){
    //filter the id from transactions

    transactions = transactions.filter( transaction => transaction.id !==id);
    if(JSON.parse(localStorage.getItem('id')) === id ){
    localStorage.clear();
    }
    init();

}
function init(){
    //clear all transaction history
    list.innerHTML= '';
    const tran = {
        id: JSON.parse( localStorage.getItem('id')),
        reason: localStorage.getItem('reason'),
        amount: +JSON.parse(localStorage.getItem('amount'))
    }
    if(tran.reason !== null)
    transactions.push(tran);

    //display all elements from the storage
    transactions.forEach(displayTransaction);
    //update all balances value
    updateBalance();


};

//listen for click on submit button
form.addEventListener('submit', addTransaction);
init();