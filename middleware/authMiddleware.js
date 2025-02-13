const jwt = require("jsonwebtoken");
const SECRET_KEY = "e055723fc55c6574b0b3b8fddaf2c1738fc1371f4d53c2ec9fde5a65dc9295eb281b3d6c432032bf1a8d1247ebb5ce5015dc7b49acb5a16e9ec3954460da6880abd7b86762b0547507d2528e4ff6924a7d714e55a72c37d0c11786832266fe9037e5ea421d5548ba3d3c5472a1f521e17ba15de4ef2811f17f9f410cffc61cd5642522e8066e6b8ba2921faa824e4194d8b6164bc14adc57a381bbfc4923e822cee9182389838caa70c96aa20d45480a7ecc345797f4058f1fde012abd758650222dc83253e4d11d170947cb65cb1f72135c26a1e705b7354d93590e0328237ece47e74e65f8f733bad7ec12dcf49978310360e17039783ae6dd3d0cd8a33b77";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Unauthorized" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
