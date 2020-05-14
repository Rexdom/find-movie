const jwt = require("jsonwebtoken");

export default function createjwt(email) {
  const token = jwt.sign({ user: email }, process.env.secret, {
    expiresIn: "1 day",
  });
  return token;
}
