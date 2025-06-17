const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const users = [];
const SECRET_KEY = process.env.JWT_SECRET || "test";
let count = 0;

const base64Encode = (obj) =>
  Buffer.from(JSON.stringify(obj)).toString("base64");

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if user exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password, userId: createUserId() });
  res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});


app.get("/verify", authenticateToken, (req, res) => {
  const userBase64 = base64Encode(req.user);
  res.setHeader("X-Authenticated-User", userBase64);
  res.status(200).end();
});

app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({
    message: "Page not found in auth service",
  });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find((u) => u.userId === decoded.userId);

    req.user = {
      ...user,
      password: undefined,
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

function createUserId() {
  return ++count;
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
