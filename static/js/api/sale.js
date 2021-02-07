"use strict";

{
  async function callSaleApi() {
    const res = await fetch("https://shinac.pythonanywhere.com/api/sale/");
    const sales = await res.json();
    console.log(sales);
  }

  callSaleApi();
}
