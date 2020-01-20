const url = require("url");
const products = require("../../db/products/all-products.json");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex !== -1) {
    return url.substring(lastIndex + 1);
  }
};

const findProdById = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const idFind = getId(parsedUrl.path);
  const idProd = products.filter(el => el.id === Number(idFind));
  let foundedProducts;

  if (idProd.length === 0 || !idProd) {
    foundedProducts = {
      status: "no products",
      products: []
    };
  } else {
    foundedProducts = {
      status: "success",
      products: idProd
    };
  }

  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(foundedProducts));
  res.end();
};

module.exports = findProdById;
