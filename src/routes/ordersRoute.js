const express = require("express");
let router = express.Router();
const fs = require("fs");
const path = require("path");
let allProducts = require("../db/all-products.json");
let allUsers = require("../db/all-users.json");
const shortid = require("shortid");

const findProducts = products => {
  const ids = products.products;
  const foundedProducts = [];

  ids.map(el => {
    const findProduct = allProducts.find(elem => elem.id === +el);
    if (findProduct) {
      foundedProducts.push(findProduct);
    }
  });

  return foundedProducts;
};

const createOrdersFolderAndJsonFile = order => {
  let foundedUser;

  allUsers.map(user => {
    if (user.id === order.user) {
      foundedUser = user;
    }
  });

  const dirPath = path.join(
    __dirname,
    `../db/users/${foundedUser.user}/orders`
  );

  fs.mkdir(dirPath, err => {
    if (err) {
      return console.log(err);
    }
  });

  let name = [];
  order.products.map(el => {
    let found = allProducts.find(elem => elem.id === +el);
    if (found) {
      name.push(found.name);
    }
  });

  const filePath = path.join(`${dirPath}`, `${name}.json`);

  fs.writeFile(filePath, JSON.stringify(order), function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

router.post("/*", function(req, res) {
  let body = "";

  req.on("data", function(data) {
    body = body + data;
  });

  req.on("end", function() {
    const post = JSON.parse(body);

    const foundedProd = findProducts(post);

    post.id = shortid.generate();

    if (foundedProd.length !== 0) {
      createOrdersFolderAndJsonFile(post);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ status: "success", order: post }));
      res.end();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ status: "failed", order: null }));
      res.end();
    }
  });
});

module.exports = router;
