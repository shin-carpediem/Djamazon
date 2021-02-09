// https://www.sejuku.net/blog/25060
"use strict";

{
  const filter_product = document.getElementById("filter-product");
  const clickbtn = document.getElementById("filterBtn");

  filter_product.addEventListener("change", (e) => {
    clickbtn.click(e);
  });
}
