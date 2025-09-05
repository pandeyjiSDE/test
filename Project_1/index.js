const express = require("express");
const fs = require("fs");

let users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware to parse JSON request body
app.use(express.json());

// REST API

// GET all users
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json(user);
});

// POST - Add new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ status: "error", message: err });
    return res.json({ status: "success", id: users.length });
  });
});

// PUT - Update user
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ status: "error", message: err });
    return res.json(user);
  });
});

// DELETE - Remove user
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ status: "error", message: err });
    return res.json({ message: "User deleted successfully" });
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));


