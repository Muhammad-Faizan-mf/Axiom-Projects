const addUserBtn = document.getElementById('add-user');
const doubleWealthBtn = document.getElementById('double-wealth');
const filterWealthBtn = document.getElementById('filter-wealth');
const sortWealthBtn = document.getElementById('sort-wealth');
const sumWealthBtn = document.getElementById('sum-wealth');
const main = document.getElementById('main');

let userArray = [];

async function generateRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name : `${user.name.title} ${user.name.first} ${user.name.last}`,
        wealth : Math.floor(Math.random() * 1000000)
    };
    addUserData(newUser);
};

function addUserData(user){
    userArray.push(user);
    updateDOM();

};

function updateDOM(userData = userArray){

    main.innerHTML = '<h2><strong>User</strong>Wealth</h2>';
    userData.forEach(user => {
        const divElement = document.createElement('div');
        divElement.classList.add('user');
        // divElement.innerHTML = `<strong>${user.name}</strong>$${formatWealth(user.wealth)}`;
        divElement.innerHTML = `<strong>${user.name}</strong> $${formatWealth(user.wealth)}`;

        main.appendChild(divElement);
    })
};
function formatWealth(wealth){
    // return wealth.toFixed(2).replace
    return wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

};
function doubleWealth(){
    // console.log( userArray.wealth[0]);
    userArray = userArray.map( user => {
        return { ...user, wealth: user.wealth *2}
    });
    // userArray = userArray.map(wealth: user.wealth*2);
    updateDOM();
};
function filterWealth(){
    userArray = userArray.filter(user => user.wealth > 1000000);
    updateDOM();
};
function sortUsers(){
    userArray.sort((a, b) => b.wealth - a.wealth);
    updateDOM();
};

function calculateNetWealth(){
    const netWealth = userArray.reduce((acc,user) =>
        (acc +=user.wealth),0 
    );
    const totalWealthDiv = document.createElement('div');
    // totalWealth.innerHTML = `<h3>Net Wealth: <strong>$${formatWealth(netWealth)}</strong></h3>`;
    totalWealthDiv.innerHTML = `<h3>Net Wealth: <strong>$${formatWealth(netWealth)}</strong></h3>`;

    main.appendChild(totalWealthDiv);

};
addUserBtn.addEventListener('click', generateRandomUser);
doubleWealthBtn.addEventListener('click', doubleWealth);
filterWealthBtn.addEventListener('click', filterWealth);
sortWealthBtn.addEventListener('click', sortUsers);
sumWealthBtn.addEventListener('click', calculateNetWealth);

// doubleWealth();
generateRandomUser();
generateRandomUser();
// addUserBtn.addEventListener('click' , generateRandomUser);
