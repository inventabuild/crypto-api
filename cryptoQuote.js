const inputField = document.querySelector("[name=userInput]");
const form = document.querySelector(".js-form");
const cryptoInputField = document.querySelector(".js-cryptoInputField");
const listAllBtn = document.querySelector(".js-listAll");
const searchBtn = document.querySelector(".js-search");
var cryptoInputFromUser = "";
var listAllClicked = "False";

form.addEventListener("submit", cryptoQuote);
// listAllBtn.addEventListener("click", listAllFunction);
// searchBtn.addEventListener("click", searchFunction);
function listAllFunction(event) {
  event.preventDefault();
  debugger;
  alert(event.target.id);
  if (event.target.id === "js-listAll") {
    alert("List All Triggered");
  }

  listAllClicked = "True";
  cryptoInputFromUser = cryptoInputField.value;
  cryptoQuote();
}
function searchFunction(event) {
  event.preventDefault();
  debugger;
  alert(event);
  listAllClicked = "False";
  cryptoInputFromUser = cryptoInputField.value;
  cryptoQuote(event);
}
function cryptoQuote(event) {
  event.preventDefault();
  cryptoInputFromUser = cryptoInputField.value;
  const searchExpression = inputField.value;
  inputField.value = "";
  let API_URL = `https://api.coingecko.com/api/v3/coins/`;
  if (event.submitter.id === "js-search") {
    listAllClicked = "False";
    if (searchExpression.length > 0) {
      API_URL += `${searchExpression}`;
    }
  } else {
    listAllClicked = "True";
  }
  fetch(API_URL)
    .then((data) => data.json())
    .then(buildQuoteTable);
}
function buildQuoteTable(response) {
  if (!Array.isArray(response)) {
    response = [response];
  }
  var header = "";
  var row = "";
  header = `<tr class="quote-table">
          <th>Name</th>
          <th>Symbol</th>
          <th>Current Price (USD)</th>
          </tr>`;
  document.querySelector(".js-quote-table-body").innerHTML = header;
  if (listAllClicked === "True") {
    for (let i = 0; i < response.length; i++) {
      row = `<tr>
              <td>${response[i].name}</td>
              <td>${response[i].symbol}</td>
              <td>${response[i].market_data.current_price.usd}</td>
            </tr>`;
      document.querySelector(".js-quote-table-body").innerHTML += row;
    }
  } else {
    // alert(response.name, cryptoInputFromUser);
    var success = "False";
    for (let i = 0; i < response.length; i++) {
      if (response[i].id === cryptoInputFromUser) {
        row = `<tr>
              <td>${response[i].name}</td>
              <td>${response[i].symbol}</td>
              <td>${response[i].market_data.current_price.usd}</td>
            </tr>`;
        document.querySelector(".js-quote-table-body").innerHTML += row;
        i = response.length;
        success = "True";
      }
    }
    if (success === "False") {
      alert("Your crypto selection is not in our database");
    }
  }
}
