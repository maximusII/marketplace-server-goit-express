const products = require("../../db/products/all-products.json");
const qs = require("qs");

const findIds = (req, res) => {
  let arrOfProducts = [];
  let foundedProducts;
  const ids = qs.parse(req.url);
  const findIds = Object.values(ids)[0];
  const quoteFirstIndex = findIds.indexOf("'");
  const quoteLastIndex = findIds.lastIndexOf("'");
  const idsValue = findIds
    .slice(quoteFirstIndex + 1, quoteLastIndex)
    .split(",");

  console.log(idsValue);

  idsValue.map(el => {
    const findProduct = products.find(elem => elem.id === +el);
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
  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(foundedProducts));
  res.end();
};

module.exports = findIds;
