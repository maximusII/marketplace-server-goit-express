const express = require("express");
let router = express.Router();
let allProducts = require("../db/all-products.json");

router.get("/*", function(req, res) {
  if (req.url.includes("?")) {
    let arrOfProducts = [];
    const ids = req.query.ids;
    const arrOfIds = ids.split(",");

    arrOfIds.map(el => {
      const findProduct = allProducts.find(elem => elem.id === +el);
      if (findProduct) {
        const obj = {
          id: findProduct.id,
          sku: findProduct.sku,
          name: findProduct.name,
          description: findProduct.description
        };
        arrOfProducts.push(obj);
      }
      if (arrOfProducts.length !== 0) {
        foundedProducts = {
          status: "success",
          products: arrOfProducts
        };
      } else {
        foundedProducts = {
          status: "no products",
          products: []
        };
      }
    });

    res.setHeader("Content-Type", "application/json");
    res.send(foundedProducts);
    res.end();

    return;
  }

  let id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const findProductFromId = allProducts.find(prod => prod.id.toString() === id);

  if (findProductFromId) {
    res.setHeader("Content-Type", "application/json");
    res.send(findProductFromId);
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        status: "no products",
        products: []
      })
    );
    res.end();
  }
});

module.exports = router;
