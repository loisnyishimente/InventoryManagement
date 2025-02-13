const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


router.put("/:id/role", authMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    await User.update({ role }, { where: { id: req.params.id } });
    res.json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

module.exports = router;
