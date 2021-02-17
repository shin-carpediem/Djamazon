"use strict";

async function callSaleApi() {
  const res = await fetch("http://127.0.0.1:8000/api/sale/");
  const sales = await res.json();
  console.log(sales[0]);
}
