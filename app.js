const express = require("express");
let app = express();
let allProducts = require("./src/db/all-products.json");

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/products/*", function(req, res) {
  let id = req.url.slice(10);
  const findProductFromId = allProducts.find(prod => prod.id.toString() === id);
  // console.log(findProductFromId);
  if (findProductFromId) {
    res.setHeader("Content-Type", "application/json");
    res.send(findProductFromId);
  }
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      status: "no products",
      products: []
    })
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
