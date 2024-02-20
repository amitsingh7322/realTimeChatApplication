const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
exports.authGuard = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token found" });
    }
    const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeUser) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decodeUser.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error while authGuard middleware", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
