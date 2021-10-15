const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//////////////////////////////////////////////

let data = [];
//Get 3 users at first
getRandomUser();
getRandomUser();
getRandomUser();
// fetch the random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  console.log(data);

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
  //console.log(newUser);
}

//Double Money function
function doubleMoney() {
  data = data.map(function (user) {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

//Sort users by richest
function sortByRichest() {
  data.sort(function (a, b) {
    return b.money - a.money;
  });
  updateDom();
}

//filter only millionaires
function showMillionaires() {
  data = data.filter(function (user) {
    return user.money > 1000000;
  });
  updateDom();
}

//Calculate the total wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3> Total wealth: <strong> ${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Add new obj to the data array we use paramter obj
function addData(obj) {
  data.push(obj);

  updateDom();
}

// Update the DOM
//----------------- we put the paramter defualt to data
//because if we don't pass any arguments once we call the function it uses data by default
function updateDom(providedData = data) {
  //clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(function (item) {
    //main.innerHTML = `${item.name} ${item.money}`;
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Function to format money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add new random number using user button
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
