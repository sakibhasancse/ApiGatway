const express = require("express");
const app = express();
const base64Decode = (str) =>
  JSON.parse(Buffer.from(str, "base64").toString("utf-8"));

app.get("/products", (req, res) => {
  const userHeader = req.headers["x-authenticated-user"];
  const user = base64Decode(userHeader);

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

app.listen(4000, () => console.log("Product service running on port 4000"));
