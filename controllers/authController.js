const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Role, Permission } = require("../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: { model: Role, include: Permission } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userPermissions = user.Role.Permissions.map((perm) => perm.name);

    const token = jwt.sign(
      { id: user.id, role: user.Role.name, permissions: userPermissions },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

module.exports = { login };
