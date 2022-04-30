const inputField = document.querySelector(".js-cryptoInputField");
const form = document.querySelector(".js-form");
const cryptoInputField = document.querySelector(".js-cryptoInputField");
const listAllBtn = document.querySelector(".js-listAll");
const searchBtn = document.querySelector(".js-search");
const theader = document.querySelector(".thead-visibility");
var listAllClicked = false;
var html = "";
var searchExpression = "";
var arrayIndex = "";

let dollarUSLocale = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 20,
  style: "currency",
  currency: "USD",
});

form.addEventListener("submit", cryptoQuote);
function cryptoQuote(event) {
  event.preventDefault();
  theader.style.visibility="hidden";
  listAllClicked = false;
  document.querySelector(".js-quote-tbody").style.fontSize = "16px";
  searchExpression = inputField.value;
  inputField.value = "";
  let searchExpressionLowerCase = searchExpression.toLowerCase();
  searchExpression = searchExpressionLowerCase.trim();
  if (searchExpression.length === 0) {
    listAllClicked = true;
  };
  let API_URL = `https://api.coingecko.com/api/v3/coins/`;
  fetch(API_URL)
    .then((data) => data.json())
    .then((responses) => {
      function findCryptoIndex(response) {
      for (i = 0; i < response.length; i+=1 ) {
        if (response[i].name.toLowerCase() === searchExpression) {
          return i;
        }
      }
      return -1;
      }
      arrayIndex = findCryptoIndex(responses);
      if (arrayIndex === -1 && searchExpression.length > 0) {
        document.querySelector(".js-quote-tbody").style.fontSize = "18px";
        document.querySelector(".js-quote-tbody").style.fontWeight = "bold";
        document.querySelector(".js-quote-tbody").innerHTML = "You're selection is not in our database.  Please try again.";
        return false;
      }
      buildQuoteTable(responses);
    }
    );
}
function buildQuoteTable(response) {
  const finalCryptoArray = [];
  if (listAllClicked === false) {
    finalCryptoArray.push(response[arrayIndex]);
  } else {
    Array.prototype.push.apply(finalCryptoArray, response);
    let sortedArray = finalCryptoArray.sort(cryptoNameCompare);
  }
  var header = "";
  var row = "";
  html = "";
  theader.style.visibility="visible";
  document.querySelector(".js-quote-tbody").innerHTML="";
  let mvgAvg200Day = ""
  for (let i = 0; i < finalCryptoArray.length; i++) {
    if (isNaN(finalCryptoArray[i].market_data.price_change_percentage_200d_in_currency.usd)) {
      mvgAvg200Day = "Note enough data"}
    else{
      mvgAvg200Day = finalCryptoArray[i].market_data.price_change_percentage_200d
    }
    try{
    row = `<tr>
            <td>${finalCryptoArray[i].name}</td>
            <td>${finalCryptoArray[i].symbol}</td>
            <td>${dollarUSLocale.format(finalCryptoArray[i].market_data.current_price.usd)}</td>
            <td>${mvgAvg200Day}</td>     
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
      return -1;
    }
  }
  document.querySelector(".js-quote-tbody").innerHTML = html;
}
