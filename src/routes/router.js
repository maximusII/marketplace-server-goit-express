const mainRoute = require("./main/main");
const signUpRoute = require("./users/sign-up-route");
const productsRoute = require("./products/products");

const router = {
  "/signup": signUpRoute,
  "/products": productsRoute,
  default: mainRoute
};

module.exports = router;
