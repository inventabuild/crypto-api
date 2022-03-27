const inputField = document.querySelector("[name=name]");
const form = document.querySelector(".js-search-form");
// form.addEventListener("submit", cryptoQuote);
const listAllButton = document.querySelector(".js-listAll");
const cryptoQuoteButton = document.querySelector(".js-cryptoQuote");

function cryptoQuote (event) {
    // event.preventDefault();
    debugger;
    const searchExpression = inputField.value;
    inputField.value = "";
    let API_URL = `https://api.coingecko.com/api/v3/coins/`;
    if (searchExpression.length > 0) {
        API_URL += `${searchExpression}`;
    }
    fetch(API_URL)
        .then((data) => data.json())
        .then(renderCrypto);
    }

    function renderCrypto(response) {
        // alert(response.id)
        // alert(response.market_data.current_price.usd)
        // const cryptQuote = response.data;
        let htmlTemplate = "";
        for (let i = 0; i < response.length; i++) {
        htmlTemplate += `<li>${response[i].id}</li>`
        }
        // <div class="quote">
        //     <h4>${response.id}</h4>
        // </div>
        document.querySelector(".js-crypto-container").innerHTML = htmlTemplate;
        debugger;
        if (listAllClicked == "True") {
            debugger;
            // listAllConst.addEventListener("click", listAllFunction);
        }
        else if (document.getElementById(".js-cryptoQuote").click == "True") {
            // cryptoQuoteConst.addEventListener("click", cryptoQuoteFunction);
        }
    }

    var listAllClicked = "False"
    // listAllButton.addEventListener("click", alert("test"));

    function listAllFunction(event) {
        listAllClicked == "True"
        cryptoQuote
    }

    function PopPop () {
        alert("Pop");
    }


    function cryptoQuoteFunction(event) {
        debugger;
        alert("cryptoQuote");
    }