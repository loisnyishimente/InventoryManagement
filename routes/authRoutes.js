const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const SECRET_KEY = "e055723fc55c6574b0b3b8fddaf2c1738fc1371f4d53c2ec9fde5a65dc9295eb281b3d6c432032bf1a8d1247ebb5ce5015dc7b49acb5a16e9ec3954460da6880abd7b86762b0547507d2528e4ff6924a7d714e55a72c37d0c11786832266fe9037e5ea421d5548ba3d3c5472a1f521e17ba15de4ef2811f17f9f410cffc61cd5642522e8066e6b8ba2921faa824e4194d8b6164bc14adc57a381bbfc4923e822cee9182389838caa70c96aa20d45480a7ecc345797f4058f1fde012abd758650222dc83253e4d11d170947cb65cb1f72135c26a1e705b7354d93590e0328237ece47e74e65f8f733bad7ec12dcf49978310360e17039783ae6dd3d0cd8a33b77"; // Store in .env file

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
