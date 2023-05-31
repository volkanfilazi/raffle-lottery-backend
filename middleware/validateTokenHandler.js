const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user;
      next();
      console.log("tokennn", token);
      console.log("authHeader", authHeader);
      console.log("decoded", decoded);
    } catch (err) {
      res.status(401);
      console.log("tokennn", token);
      console.log("authHeader", authHeader);
      console.log("decoded", decoded);
      throw new Error("User is not authorized");
    }
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = validateToken