const products = require("../../db/products/all-products.json");
const qs = require("qs");

const findCategory = (req, res) => {
  let arrOfProducts = [];
  let foundedProducts;
  const category = qs.parse(req.url);
  const findCategory = Object.values(category)[0];
  const categoryFirstIndex = findCategory.indexOf('"');
  const categoryLastIndex = findCategory.lastIndexOf('"');
  const categoryValue = findCategory.slice(
    categoryFirstIndex + 1,
    categoryLastIndex
  );

  const findProducts = products.filter(
    el => el.categories[0] === categoryValue
  );

  if (findProducts.length === 0) {
    foundedProducts = {
      status: "no products",
      products: []
    };
  } else {
    findProducts.map(el => {
      const obj = {
        id: el.id,
        sku: el.sku,
        name: el.name,
        description: el.description
      };
      arrOfProducts.push(obj);
      foundedProducts = {
        status: "success",
        products: arrOfProducts
      };
    });
  }

  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(foundedProducts));
  res.end();
};

module.exports = findCategory;
