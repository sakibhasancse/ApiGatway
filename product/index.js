const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/products", getUser, (req, res) => {
  const user = req.user;

  res.json({
    message: "Product list",
    user,
    products: [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Smartphone" },
    ],
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found in product service",
  });
});

function getUser(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  const decoded = jwt.decode(token);
  req.user = { userId: decoded.userId };
  next();
}

app.listen(4000, () => console.log("Product service running on port 4000"));
