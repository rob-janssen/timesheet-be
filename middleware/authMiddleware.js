const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.cookie && req.headers.cookie.startsWith("token")) {
    try {
      // Receive token from cookie and split
      token = req.headers.cookie.split("token=")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token - exclude the (hashed) password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. No token present.");
  }
});

module.exports = { protect };
