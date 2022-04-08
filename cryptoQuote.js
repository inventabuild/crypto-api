// const inputField = document.querySelector("[name=userInput]");
const inputField = document.querySelector(".js-cryptoInputField");
const form = document.querySelector(".js-form");
const cryptoInputField = document.querySelector(".js-cryptoInputField");
const listAllBtn = document.querySelector(".js-listAll");
const searchBtn = document.querySelector(".js-search");
const theader = document.querySelector(".thead-visibility");
var listAllClicked = "False";
var html = "";
var searchExpression = ""

// document.onkeydown = findKeyCode
// inputField.addEventListener("keyup", findKeyCode);
// function findKeyCode(event){
// event.preventDefault;
// const unicode = event.which;
// const searchExpression = inputField.value;
// if (unicode == 13 && searchExpression.length > 0){
//   cryptoQuote(event);
// }
// else if (unicode == 13 && !searchExpression.length > 0){
//   theader.style.visibility="hidden";
//   html = "Enter a name or ticker symbol in the Search field";
//   document.querySelector(".js-quote-tbody").innerHTML = html;
//   return false;
// }
// else {
//   return false;
// }
// }

form.addEventListener("submit", cryptoQuote);
function cryptoQuote(event) {
  event.preventDefault();
  const unicode = event.which;
  theader.style.visibility="hidden";
  searchExpression = inputField.value;
  inputField.value = "";
  let searchExpressionLowerCase = searchExpression.toLowerCase();
  searchExpression = searchExpressionLowerCase;
  let API_URL = `https://api.coingecko.com/api/v3/coins/`;
  debugger;
  fetch(API_URL)
    .then((data) => data.json())
    .then((responses) => {
      function findCrypto (response) {
        // if (response.name.toLowerCase() === searchExpression) {
        //   alert("Test");
        //   return response.name.toLowerCase()
        // }
        
        return response.name.toLowerCase() === searchExpression;
      }
    debugger;
    document.querySelector(".js-quote-tbody").innerHTML = responses.filter(findCrypto).map(function(person){return person.name}).join("");
    debugger;
    });
    debugger;
  if (event.submitter.id === "js-search") {
    listAllClicked = "False";
    if (!searchExpression.length > 0){
      html = "Enter crypto name in the Search field";
      document.querySelector(".js-quote-tbody").innerHTML = html;
      return false;
    }
    else if (searchExpression.length > 0) {
      API_URL += `${searchExpression}`;
    }
    else {
      listAllClicked = "True";
    } 
  }
  // fetch(API_URL)
  //   .then((data) => data.json())
  //   .then(buildQuoteTable); 
}
function listAllCryptoArray (responses) {
  function findCryptoInput (response){
    return response.name.toLowerCase() === searchExpression;
    debugger;
  }
  debugger;
}
function buildQuoteTable(response) {
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
