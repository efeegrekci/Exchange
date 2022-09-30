$(document).ready(function () {
  // exchangeBox Left
  function exchangeRateService() {
    let moneyCode = ["USD", "EUR", "JPY", "GBP", "DKK", "NOK"];
    let moneyBase = "";

    moneyCode.forEach(function (item) {
      let requestURL = `https://api.exchangerate.host/latest?base=${item}&symbols=TRY`;
      let request = new XMLHttpRequest();
      request.open("GET", requestURL);
      request.responseType = "json";
      request.send();

      request.onload = function () {
        let response = request.response;
        switch (response.base) {
          case "USD":
            moneyBase = "Amerikan Doları";
            break;
          case "EUR":
            moneyBase = "Avrupa Para Birimi";
            break;
          case "JPY":
            moneyBase = "Japon Yeni";
            break;
          case "GBP":
            moneyBase = "İngiliz Sterlini";
            break;
          case "DKK":
            moneyBase = "Danimarka Kronu";
            break;
          case "NOK":
            moneyBase = "Norveç Kronu";
        }
        let exchangeRateList = `<li><div class="imageBox"><img src="/assets/img/${response.base}-flag.png" width="auto" height="auto" alt="${response.base}" /></div><div class="textBox"><div class="column"><div class="title">${response.base}</div><div class="desc">${moneyBase}</div></div><div class="column"><div class="minTitle">ALIŞ</div><div class="number">${response.rates.TRY}</div></div><div class="column"><div class="minTitle">SATIŞ</div><div class="number">${response.rates.TRY}</div></div></div></li>`;
        $(".exchangeBox .left ul").append(exchangeRateList);
      };
    });
  }
  // exchangeBox Left

  // exchangeBox Right
  function convertService(money, amount) {
    if (amount == "") {
      $("#to").val(0);
    } else {
      let requestURL = `https://api.exchangerate.host/convert?from=${money}&to=TRY&amount=${amount}`;
      let request = new XMLHttpRequest();
      request.open("GET", requestURL);
      request.responseType = "json";
      request.send();

      request.onload = function () {
        let response = request.response;
        let convertMoney = response.result
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1.")
          .replace(/\.(\d+)$/, ",$1");
        $("#to").val(convertMoney);
      };
    }
  }

  function inputs() {
    let amount = $("#from").val().replaceAll(".", "");
    let money = $(".select2-selection__rendered").attr("title");
    convertService(money, amount);
  }

  function delay(callback, ms) {
    var timer = 0;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  $("#from").on(
    "keyup",
    delay(function () {
      inputs();
    }, 300)
  );

  $(".changeSelect").on("select2:select", function () {
    inputs();
  });
  // exchangeBox Right

  // Dropdown Select Code
  $(".changeSelect").select2({
    minimumResultsForSearch: -1,
  });
  // Dropdown Select Code

  // Input Mask Code
  $(".from").mask("000.000.000.000.000", { reverse: true });
  // Input Mask Code

  // Page Load
  inputs();
  exchangeRateService();
  // Page Load
});
