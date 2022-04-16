// const inputField = document.querySelector("[name=userInput]");
const inputField = document.querySelector(".js-cryptoInputField");
const form = document.querySelector(".js-form");
const cryptoInputField = document.querySelector(".js-cryptoInputField");
const listAllBtn = document.querySelector(".js-listAll");
const searchBtn = document.querySelector(".js-search");
const theader = document.querySelector(".thead-visibility");
var listAllClicked = false;
var html = "";
var searchExpression = ""
var arrayIndex = ""

form.addEventListener("submit", cryptoQuote);
function cryptoQuote(event) {
  event.preventDefault();
  theader.style.visibility="hidden";
  document.querySelector(".js-quote-tbody").style.fontSize = "16px";
  searchExpression = inputField.value;
  inputField.value = "";
  let searchExpressionLowerCase = searchExpression.toLowerCase();
  searchExpression = searchExpressionLowerCase.trim();
  if (searchExpression.length === 0) {
    listAllClicked = true;
  }
  let API_URL = `https://api.coingecko.com/api/v3/coins/`;
  fetch(API_URL)
    .then((data) => data.json())
    .then((responses) => {
      function findCryptoIndex(response) {
      for (i = 0; i < response.length; i+=1 ) {
        if (response[i].name.toLowerCase() === searchExpression) {
          return i
        }
      }
      return -1
      }
      arrayIndex = findCryptoIndex(responses)
      if (arrayIndex === -1 && searchExpression.length > 0) {
        document.querySelector(".js-quote-tbody").style.fontSize = "25px";
        document.querySelector(".js-quote-tbody").innerHTML = "You're selection is not in our database.  Please try again.";
        return false;
      }
      buildQuoteTable(responses);
    }
    );
}
function buildQuoteTable(response) {
  debugger;
  alert(response[arrayIndex].name)
  if (!Array.isArray(response)) {
    response = [response];
  }
  let sortedArray = response.sort(cryptoNameCompare)
  if (listAllClicked = "False") {
    let filterbyName = response.filter(cryptoByName)
  }
  var header = "";
  var row = "";
  html = ""
  theader.style.visibility="visible";
  document.querySelector(".js-quote-tbody").innerHTML=""
  for (let i = 0; i < response.length; i++) {
    try{
    row = `<tr>
            <td>${response[i].name}</td>
            <td>${response[i].symbol}</td>
            <td>${response[i].market_data.current_price.usd}</td>
            <td>${response[i].market_data.price_change_percentage_200d}</td>       
          </tr>`;
          html = html += row;
    }
    catch{
      theader.style.visibility="hidden";
      html = "Your crypto selection is not in our database";
    }
  }
  function cryptoNameCompare (response1, response2) {
    if (response1.name.toUpperCase() > response2.name.toUpperCase()) {
      return 1;
    } else {
      return -1
    }
  }
  function cryptoByName (response) {
    debugger;
    return response.name.toLowerCase() === searchExpression;
  }
  
  document.querySelector(".js-quote-tbody").innerHTML = html;
}
