
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id },"Billionarebefore25", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;