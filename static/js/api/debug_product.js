"use strict";

{
  async function callProductApi() {
    const res = await fetch("http://127.0.0.1:8000/api/product/");
    const products = await res.json();
    console.log(products);
  }

  callProductApi();
}
