"use strict";

{
  async function callSaleApi() {
    const res = await fetch("https://djamazonapp.pythonanywhere.com/api/sale/");
    const sales = await res.json();
    console.log(sales);
  }

  callSaleApi();
}
