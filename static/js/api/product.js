"use strict";

{
  async function callProductApi() {
    const res = await fetch("https://djamazonapp.pythonanywhere.com/api/product/");
    const products = await res.json();
    console.log(products);
  }

  callProductApi();
}
